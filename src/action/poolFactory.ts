import {ZERO_ADDRESS} from '../utils/constants'
import {Account, Pool, PoolFactory} from '../model'
import {CheckerDeferredValue, ContractChecker} from '../utils/contractChecker'
import {Action, ActionConfig} from './base'
import assert from 'assert'
import {config} from "../main";
import {createAccountId, createPoolFactoryId, createPoolId} from "../utils/ids";

export interface CreatePoolFactoryData {
    poolFactoryAddress: string
    ownerId: string
}

export class CreatePoolFactoryAction extends Action<CreatePoolFactoryData> {
    async perform(): Promise<void> {
        const ownerAddress = this.data.ownerId.toLowerCase()
        const poolFactoryAddress = this.data.poolFactoryAddress.toLowerCase()

        const ownerId = createAccountId(ownerAddress)
        const poolFactoryId = createPoolFactoryId(poolFactoryAddress)

        const owner = await this.store.getOrFail(Account, ownerId)

        const poolFactory = new PoolFactory({
            id: poolFactoryId,
            address: poolFactoryAddress,
            chainId: config.chainId,
            timestamp: new Date(this.block.timestamp),
            blockNumber: this.block.height,
            poolCount: 0,
            txCount: 0,
            ownerId: ownerId,
            owner,
        })

        await this.store.insert(poolFactory)
    }
}

export interface UpdateOwnerPoolFactoryData {
    poolFactoryId: string
    previousOwnerId: string
    newOwnerId: string
}

export class UpdateOwnerPoolFactoryAction extends Action<UpdateOwnerPoolFactoryData> {
    async perform(): Promise<void> {
        const newOwner = await this.store.getOrFail(Account, this.data.newOwnerId)
        const poolFactory = await this.store.getOrFail(PoolFactory, this.data.poolFactoryId)

        poolFactory.ownerId = this.data.newOwnerId
        poolFactory.owner = newOwner
        poolFactory.timestamp = new Date(this.block.timestamp)

        await this.store.upsert(poolFactory)
    }
}
