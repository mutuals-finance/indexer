import * as tokenAbi from '../abi/ERC20'
import {IndexerContext} from '../interfaces'
import {Account, Token} from '../model'
import {createAccountId, createPoolId, createTokenId} from '../utils/ids'
import {Item} from './common'
import {PoolManager} from "../utils/manager";
import {Log} from "@subsquid/evm-processor";
import {config} from "../main";

export function getTokenActions(ctx: IndexerContext, item: Item) {
    if (item.address == null) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case tokenAbi.events.Transfer.topic:
                    handleTransfer(ctx, log)
                    break
            }
        }
    }
}

function handleTransfer(ctx: IndexerContext, log: Log) {
    // check if erc20 token
    if (log.topics[0] !== tokenAbi.events.Transfer.topic) return
    const event = tokenAbi.events.Transfer.decode(log)

    const tokenAddress = log.address.toLowerCase()
    const fromAddress = event.from.toLowerCase()
    const fromAccountId = createAccountId(fromAddress)
    const fromPoolId = createPoolId(fromAddress)

    const toAddress = event.to.toLowerCase()
    const toAccountId =  createAccountId(toAddress)
    const toPoolId = createPoolId(toAddress)

    const poolManager = PoolManager.get(ctx)
    const isDeposit = poolManager.isPool(config.poolFactory, toPoolId)
    if (!(poolManager.isPool(config.poolFactory, fromPoolId) || isDeposit)) return

    const tokenId = createTokenId(tokenAddress)
    ctx.store.defer(Token, tokenId)

    const tokenDeferred = ctx.store.defer(Token, tokenId)
    const fromDeferred = ctx.store.defer(Account, fromAccountId)
    const toDeferred = ctx.store.defer(Account, toAccountId)

    ctx.queue
        .lazy(async () => {
            const token = await tokenDeferred.get()
            if (token == null) {
                const metadata = await ctx.moralisService.fetchTokenMetadata(ctx, tokenAddress)

                ctx.queue.add('token_create', {
                    tokenAddress,
                    ...metadata
                })
            }
        })
        .lazy(async () => {
            const sender = await fromDeferred.get()
            if (sender == null) {
                ctx.queue.add('account_create', {
                    accountId: fromAccountId,
                    accountAddress: fromAddress,
                })
            }
        })
        .lazy(async () => {
            const recipient = await toDeferred.get()
            if (recipient == null) {
                ctx.queue.add('account_create', {
                    accountId: toAccountId,
                    accountAddress: toAddress,
                })
            }
        })
        .add('token_transfer', {
            tokenId,
            fromId: fromAccountId,
            toId: toAccountId,
        })
}
