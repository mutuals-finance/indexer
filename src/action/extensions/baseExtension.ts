/*
import {
    Account, Extension,
    Pool, PoolFactory,
} from '../../model'
import {Action} from '../base'
import { config } from "../../main";
import {createAccountId, createPoolId} from "../../utils/ids";

export interface BaseBaseExtensionActionData {
    poolAddress: string
}

export abstract class BaseBaseExtensionAction<T extends BaseBaseExtensionActionData = BaseBaseExtensionActionData> extends Action<T> {}

export interface CreateBaseExtensionActionData extends BaseBaseExtensionActionData {
    extensionAddress: string
    poolId: string
}

export abstract class CreateBaseExtensionAction extends BaseBaseExtensionAction<CreateBaseExtensionActionData> {
    async perform(): Promise<void> {
        const extensionAddress = this.data.extensionAddress.toLowerCase()
        const extensionId = createExtensionId(extensionAddress)

        const pool = await this.store.getOrFail(PoolFactory, this.data.poolId)

        const extension = new Extension({
            id: extensionId,
            address: extensionAddress,
            chainId: config.chainId,
            poolId: this.data.poolId,
            pool,
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
*/
