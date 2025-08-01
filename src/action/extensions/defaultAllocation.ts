/*
import {
    Account, Claim, Extension,
    Pool, PoolFactory,
} from '../../model'
import {Action} from '../base'
import { config } from "../../main";
import {createAccountId, createPoolId} from "../../utils/ids";
import {CreateAccountActionData} from "../account";

export interface CreateDefaultAllocationActionData {
    poolAddress: string
}

export class CreateDefaultAllocationAction extends Action<CreateDefaultAllocationActionData> {
    async perform(): Promise<void> {
        this.extensionType = ExtensionType.DefaultAllocation
        this.data = {}

        await this.store.save(extension);
        const owner = await this.store.getOrFail(Account, ownerId)
        const poolAccount = await this.store.getOrFail(Account, poolAccountId)
        const poolFactory = await this.store.getOrFail(PoolFactory, this.data.poolFactoryId)

        const extension = new DefaultAllocation({
            id: extensionId,
            address: extensionAddress,
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

        super.perform()
    }
}

export interface InitializeDefaultAllocationActionData {
    poolAddress: string
}

export class InitializeDefaultAllocationAction extends Action<InitializeDefaultAllocationActionData> {
    async perform(): Promise<void> {
        this.data = "parse data"

        await this.store.save(extension);
        const extension = await this.store.getOrFail(Extension, extensionId)
        super.perform()
    }
}

export type DefaultAllocationAction =
    | CreatePoolAction
*/
