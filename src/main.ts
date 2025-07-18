import { StoreWithCache, TypeormDatabaseWithCache } from '@belopash/typeorm-store'
import { ActionQueue } from './action/actionQueue'
import { MappingContext } from './interfaces'
import { Item } from './mapping/common'
import {Block, BlockData, makeProcessor} from "./processor";
import { PoolManager } from './utils/manager'
import {getTokenActions} from "./mapping/token";
import {getPoolFactoryActions} from "./mapping/poolFactory";
import assert from "assert";
import {networkConfig} from "./networkConfig";

assert(
    networkConfig.hasOwnProperty(process.argv[2]),
    `Processor executable takes one argument - a network string ID - ` +
    `that must be in ${JSON.stringify(Object.keys(networkConfig))}. Got "${
        process.argv[2]
    }".`
);

const network = process.argv[2];
const config = networkConfig[network];

const processor = makeProcessor(config);

const database = new TypeormDatabaseWithCache({
    supportHotBlocks: true,
    stateSchema: `${config.chainTag}_processor`,
    isolationLevel: "READ COMMITTED",
});

processor.run(database,
    async (ctx) => {
    const queue = new ActionQueue({
        _chain: ctx._chain,
        log: ctx.log,
        store: ctx.store,
    })

    await PoolManager.get(ctx).init()

    for (let block of ctx.blocks) {
        queue.setBlock(block.header)
        const items = orderItems(block)

        for (let item of items) {
            const tx = item.kind === 'log' ? item.value.transaction : item.value
            queue.setTransaction(tx)

            processItem({ ...ctx, queue }, item)
        }
    }

    await queue.process()
    await ctx.store.flush()
})

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

function processItem(ctx: MappingContext<StoreWithCache>, item: Item) {
    // getTokenActions(ctx, item)
    getPoolFactoryActions(ctx, item)
}

export {
    config,
    orderItems,
    processItem
}

