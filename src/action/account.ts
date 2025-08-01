import {ZERO_ADDRESS} from '../utils/constants'
import {Account, AccountType, Pool} from '../model'
import {CheckerDeferredValue, ContractChecker} from '../utils/contractChecker'
import {Action, ActionConfig} from './base'
import {ActionContext, IndexerContext} from "../interfaces";

export interface CreateAccountActionData {
    accountId: string
    accountAddress: string
}

export class CreateAccountAction extends Action<CreateAccountActionData> {
    private isContract!: CheckerDeferredValue

    constructor(ctx: ActionContext, config: ActionConfig, data: CreateAccountActionData) {
        super(ctx, config, data)

        const checker = ContractChecker.get(ctx)
        this.isContract = checker.defer(this.data.accountAddress)
    }

    async perform() {
        const isContract = this.data.accountAddress === ZERO_ADDRESS ? true : await this.isContract.get()

        const account = new Account({
            id: this.data.accountId,
            address: this.data.accountAddress,
            accountType: isContract ? AccountType.Contract : AccountType.EOA,
            ...this.updatedAt,
            ...this.createdAt
        })

        await this.store.insert(account)
        this.log.debug(`Account ${account.id} created`)
    }
}
