import { StoreWithCache } from '@belopash/typeorm-store'
import { Chain } from '@subsquid/evm-processor/lib/interfaces/chain'
import { Logger } from '@subsquid/logger'
import { withErrorContext } from '@subsquid/util-internal'
import assert from 'assert'
import { Action, ActionBlock, ActionConfig, ActionConstructor, ActionTransaction, BaseActionRegistry } from './base'
import * as PoolFactory from './poolFactory'
import * as Pool from './pool'
import * as Token from './token'
import * as Account from './account'
import * as Claim from './claim'
import {CreateClaimBatchAction} from "./claim";
import {ActionContext} from "../interfaces";
import {ServiceContext} from "../services";

const Actions = {
    account_create: Account.CreateAccountAction,
    // account_updateBalance: Account.BalanceAccountAction,

    poolFactory_create: PoolFactory.CreatePoolFactoryAction,
    poolFactory_updateOwner: PoolFactory.UpdateOwnerPoolFactoryAction,

    pool_create: Pool.CreatePoolAction,

    claim_createBatch: Claim.CreateClaimBatchAction,

    token_create: Token.CreateTokenAction,
    token_transfer: Token.TransferTokenAction,
} satisfies BaseActionRegistry

type ActionRegistry = typeof Actions

export class ActionQueue {
    private actions: Action<any>[] = []

    private block: ActionBlock | undefined
    private transaction: ActionTransaction | undefined

    constructor(private ctx: ActionContext) { }

    get size() {
        return this.actions.length
    }

    setBlock(block: ActionBlock) {
        this.block = block

        return this
    }

    setTransaction(transaction: ActionTransaction | undefined) {
        this.transaction = transaction

        return this
    }

    add<A extends keyof ActionRegistry>(
        action: A,
        data: ActionRegistry[A] extends ActionConstructor<infer R> ? R : never
    ): this {
        assert(this.block != null)

        const ActionConstructor = Actions[action] as ActionConstructor<typeof data>
        if (ActionConstructor == null) {
            throw new Error(`Action '${action}' is not registered.`)
        }

        const a = new ActionConstructor(
            this.ctx,
            {
                block: this.block,
                transaction: this.transaction,
            },
            data
        )
        this.actions.push(a)

        return this
    }

    lazy(cb: () => void | PromiseLike<void>) {
        assert(this.block != null)

        const a = new LazyAction(
            this.ctx,
            {
                block: this.block,
                transaction: this.transaction,
            },
            cb
        )
        this.actions.push(a)

        return this
    }

    async process() {
        await this.processActions(this.actions)
        this.actions = []
    }

    private async processActions(actions: Action<any>[]) {
        for (const action of actions) {
            await this.processAction(action).catch(
                withErrorContext({
                    block: action.block.height,
                    extrinsicHash: action.transaction?.hash,
                })
            )
        }
    }

    private async processAction(action: Action<any>) {
        if (action instanceof LazyAction) {
            await this.processLazyAction(action)
        } else {
            await action.perform()
        }
    }

    private async processLazyAction(action: LazyAction) {
        const saved = { block: this.block, transaction: this.transaction, actions: this.actions }
        try {
            this.block = action.block
            this.transaction = action.transaction
            this.actions = []
            await action.perform()
            await this.processActions(this.actions)
        } finally {
            this.block = saved.block
            this.transaction = saved.transaction
            this.actions = saved.actions
        }
    }
}

class LazyAction extends Action<unknown> {
    constructor(protected ctx: ActionContext, protected config: ActionConfig, readonly cb: () => void | PromiseLike<void>) {
        super(ctx, config, {})
    }

    async perform(): Promise<void> {
        await this.cb()
    }
}
