import { TypeormDatabaseWithCache } from '@belopash/typeorm-store'
import { ActionQueue } from './action/actionQueue'
import {IndexerContext} from './interfaces'
import { Item } from './mapping/common'
import {BlockData, makeProcessor, ProcessorContext} from "./processor";
import {getPoolFactoryActions} from "./mapping/poolFactory";
import {initNetworkConfig} from "./utils/network";
import {getTokenActions} from "./mapping/token";
import {IPFSService, MoralisService, ServiceContext} from "./services";
import {IPFS_GATEWAY, MORALIS_API_KEY} from "./utils/constants";

const config = initNetworkConfig(process.argv[2])

const run = async ()=> {
    const processor = makeProcessor(config);

    const database = makeDatabase()
    const service = await makeServices()
    const handler = makeHandler(service)

    processor.run(database, handler)
}

function makeDatabase() {
    return new TypeormDatabaseWithCache({
        supportHotBlocks: true,
        stateSchema: `${config.chainTag}_processor`,
        isolationLevel: "READ COMMITTED",
    });
}

async function makeServices() {
    const ipfsService = IPFSService.init({
        gateway: IPFS_GATEWAY,
        retryAttempts: 3,
        agent: { timeout: 10000 }
    })

    const moralisService = await MoralisService.init({
        apiKey: MORALIS_API_KEY,
        defaultEvmApiChain: config.chainId
    })

    return { ipfsService, moralisService }
}

function makeHandler(service: ServiceContext) {
    return async (processor: ProcessorContext) => {
        let action = {...service, ...processor}

        const queue = new ActionQueue(action)
        const ctx = {...action, queue}

        for (let block of ctx.blocks) {
            ctx.queue.setBlock(block.header)
            const items = orderItems(block)

            for (let item of items) {
                const tx = item.kind === 'log' ? item.value.transaction : item.value
                ctx.queue.setTransaction(tx)

                processItem(ctx, item)
            }
        }

        await ctx.queue.process()
        await ctx.store.flush()
    }
}

function orderItems(block: BlockData) {
    const items: Item[] = []

    for (const transaction of block.transactions) {
        items.push({
            kind: 'transaction',
            address: transaction.to,
            value: transaction,
        })
    }

    for (const log of block.logs) {
        items.push({
            kind: 'log',
            address: log.address,
            value: log,
        })
    }

    items.sort((a, b) => {
        if (a.kind === 'log' && b.kind === 'log') {
            return a.value.logIndex - b.value.logIndex
        } else if (a.kind === 'transaction' && b.kind === 'transaction') {
            return a.value.transactionIndex - b.value.transactionIndex
        } else if (a.kind === 'log' && b.kind === 'transaction') {
            return a.value.transactionIndex - b.value.transactionIndex || 1 // transaction before logs
        } else if (a.kind === 'transaction' && b.kind === 'log') {
            return a.value.transactionIndex - b.value.transactionIndex || -1
        } else {
            throw new Error('Unexpected case')
        }
    })

    return items
}

function processItem(ctx: IndexerContext, item: Item) {
    getTokenActions(ctx, item)
    getPoolFactoryActions(ctx, item)
}

void run()

export {
    config,
    orderItems,
    processItem
}

