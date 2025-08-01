import {StoreWithCache} from '@belopash/typeorm-store'
import * as poolFactoryAbi from '../abi/PoolFactory'
import {IndexerContext} from '../interfaces'
import {Account, PoolFactory} from '../model'
import {Item} from './common'
import {createAccountId, createPoolFactoryId, createPoolId} from "../utils/ids";
import {Log} from "@subsquid/evm-processor";
import {config} from "../main";

export function getPoolFactoryActions(ctx: IndexerContext, item: Item) {
    if (item.address !== config.poolFactory) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case poolFactoryAbi.events.OwnershipTransferred.topic:
                    handleOwnershipTransferred(ctx, log)
                    break
                case poolFactoryAbi.events.PoolCreated.topic:
                    handlePoolCreated(ctx, log)
                    break
            }
            break
        }
    }
}

function handlePoolCreated(ctx: IndexerContext, log: Log) {
    const event = poolFactoryAbi.events.PoolCreated.decode(log)
    const ownerAddress = event.owner.toLowerCase()
    const ownerId = createAccountId(ownerAddress)
    const ownerDeferred = ctx.store.defer(Account, ownerId)

    const poolAddress = event.pool.toLowerCase()
    const poolAccountId = createAccountId(poolAddress)

    const poolId = createPoolId(poolAddress)
    const poolFactoryId = createPoolFactoryId(log.address.toLowerCase())

    ctx.queue
        .lazy(async () => {
            ctx.queue.add('account_create', {
                accountId: poolAccountId,
                accountAddress: poolAddress,
            })
        })
        .lazy(async () => {
            const owner = await ownerDeferred.get()
            if (owner == null) {
                ctx.queue.add('account_create', {
                    accountId: ownerId,
                    accountAddress: ownerAddress
                })
            }
        })
        .add('pool_create', {
            poolAddress,
            ownerId,
            poolFactoryId,
        })
        .add('claim_createBatch', {
            poolId,
            extensions: event.extensions,
            data: event.data
        })

    //PoolManager.get(ctx).addPool(log.address, poolId)
}

function handleOwnershipTransferred(ctx: IndexerContext, log: Log) {
    const event = poolFactoryAbi.events.OwnershipTransferred.decode(log)

    const poolFactoryAddress = config.poolFactory.toLowerCase()
    const poolFactoryId = createPoolId(poolFactoryAddress)

    const previousOwnerAddress = event.previousOwner.toLowerCase()
    const previousOwnerId = createAccountId(previousOwnerAddress)

    const newOwnerAddress = event.newOwner.toLowerCase()
    const newOwnerId = createAccountId(newOwnerAddress)

    const newOwnerDeferred = ctx.store.defer(Account, newOwnerId)
    const poolFactoryDeferred = ctx.store.defer(PoolFactory, poolFactoryId)

    ctx.queue
        .lazy(async () => {
            const [newOwner, poolFactory] = await Promise.all([newOwnerDeferred.get(), poolFactoryDeferred.get()])
            if (newOwner == null) {
                ctx.queue.add('account_create', {
                    accountId: newOwnerId,
                    accountAddress: newOwnerAddress,
                })
            }

            if (poolFactory == null) {
                ctx.queue.add('poolFactory_create', {
                    poolFactoryAddress,
                    ownerId: newOwnerId,
                })
            }
        })
        .add('poolFactory_updateOwner', {
            poolFactoryId,
            previousOwnerId,
            newOwnerId,
        })
}
