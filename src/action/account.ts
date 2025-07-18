import {ZERO_ADDRESS} from '../utils/constants'
import {Account, Pool} from '../model'
import {CheckerDeferredValue, ContractChecker} from '../utils/contractChecker'
import {Action, ActionConfig} from './base'

export interface CreateAccountActionData {
    accountId: string
    accountAddress: string
}

export class CreateAccountAction extends Action<CreateAccountActionData> {
    private isContract!: CheckerDeferredValue

    constructor(config: ActionConfig, data: CreateAccountActionData) {
        super(config, data)

        const checker = ContractChecker.get(config)
        this.isContract = checker.defer(this.data.accountAddress)
    }

    async perform() {
        const isContract = (this.data.accountAddress === ZERO_ADDRESS ? true : await this.isContract.get())

        let account = new Account({
            id: this.data.accountId,
            address: this.data.accountAddress,
            timestamp: new Date(this.block.timestamp),
            blockNumber: this.block.height,
            isEOA: !isContract,
            txCount: 0
        })

        await this.store.insert(account)
        this.log.debug(`Account ${account.id} created`)
    }
}
