import {ZERO_ADDRESS} from '../utils/constants'
import {Extension} from '../model'
import {CheckerDeferredValue, ContractChecker} from '../utils/contractChecker'
import {Action, ActionConfig} from './base'
import {ActionContext} from "../interfaces";

export interface CreateAccountActionData {
    accountId: string
    accountAddress: string
}

export class CreateExtensionAction extends Action<CreateAccountActionData> {
    private isContract!: CheckerDeferredValue

    constructor(ctx: ActionContext, config: ActionConfig, data: CreateAccountActionData) {
        super(ctx, config, data)

        const checker = ContractChecker.get(ctx)
        this.isContract = checker.defer(this.data.accountAddress)
    }

    async perform() {
        const isContract = this.data.accountAddress === ZERO_ADDRESS ? true : await this.isContract.get()

        const extension = new Extension()

        await this.store.insert(extension)
        this.log.debug(`Account ${extension.id} created`)
    }
}
