import {
    Account,
    Pool, PoolFactory,
} from '../model'
import {Action} from './base'
import { config } from "../main";
import {createAccountId, createPoolId} from "../utils/ids";

export interface BasePoolActionData {
    poolAddress: string
}

export abstract class BasePoolAction<T extends BasePoolActionData = BasePoolActionData> extends Action<T> {}

export interface CreatePoolActionData extends BasePoolActionData {
    ownerId: string
    poolFactoryId: string
}

export class CreatePoolAction extends BasePoolAction<CreatePoolActionData> {
    async perform(): Promise<void> {
        const ownerId = this.data.ownerId
        const poolAddress = this.data.poolAddress.toLowerCase()
        const poolId = createPoolId(poolAddress)
        const poolAccountId = createAccountId(poolAddress)

        const owner = await this.store.getOrFail(Account, ownerId)
        const poolAccount = await this.store.getOrFail(Account, poolAccountId)
        const poolFactory = await this.store.getOrFail(PoolFactory, this.data.poolFactoryId)

        const pool = new Pool({
            id: poolId,
            address: poolAddress,
            chainId: config.chainId,
            poolFactoryId: this.data.poolFactoryId,
            poolFactory,
            accountId: poolAccountId,
            account: poolAccount,
            name: `Pool name`,
            description: `Pool description`,
            logo: '',
            ownerId,
            owner,
            ...this.updatedAt,
            ...this.createdAt
        })

        await this.store.insert(pool)
        this.log.debug(`Created pool ${pool.id}`)
    }
}

export type PoolAction =
    | CreatePoolAction
