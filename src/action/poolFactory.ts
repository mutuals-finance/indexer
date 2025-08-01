import {Account, PoolFactory} from '../model'
import {Action} from './base'
import {config} from "../main";
import {createAccountId, createPoolFactoryId} from "../utils/ids";

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
            poolCount: 0,
            ownerId: ownerId,
            owner,
            ...this.updatedAt,
            ...this.createdAt
        })

        await this.store.insert(poolFactory)
        this.log.debug(`Created pool factory ${poolFactory.id}`)

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

        const at = this.updatedAt
        poolFactory.updatedAtBlockNumber = at.updatedAtBlockNumber
        poolFactory.updatedAt = at.updatedAt
        await this.store.upsert(poolFactory)
        this.log.debug(`Update owner ${newOwner.id} for pool factory ${poolFactory.id}`)
    }
}
