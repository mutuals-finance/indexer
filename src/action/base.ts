import {BlockHeader, Transaction} from '@subsquid/evm-processor'
import {ActionContext} from "../interfaces";

export type ActionBlock = Pick<BlockHeader, 'hash' | 'height' | 'timestamp'>
export type ActionTransaction = Pick<Transaction, 'id' | 'hash'>

export interface ActionConfig {
    block: ActionBlock
    transaction?: ActionTransaction
}

export abstract class Action<T> {
    constructor(protected ctx: ActionContext, protected config: ActionConfig, readonly data: T) {}

    protected get log() {
        return this.ctx.log
    }

    protected get store() {
        return this.ctx.store
    }

    get block() {
        return this.config.block
    }

    get transaction() {
        return this.config.transaction
    }

    get createdAt() {
        return {
            createdAt: new Date(this.block.timestamp),
            createdAtBlockNumber: this.block.height,
        }
    }

    get updatedAt() {
        return {
            updatedAt: new Date(this.block.timestamp),
            updatedAtBlockNumber: this.block.height,
        }
    }

    get updateConfig() {
        return this.config.transaction
    }

    abstract perform(): Promise<void>
}

export interface ActionConstructor<T = any> {
    new (...args: ConstructorParameters<typeof Action<T>>): Action<T>
}

export type BaseActionRegistry = {[k: string]: ActionConstructor}
