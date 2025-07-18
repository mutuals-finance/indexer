import {Pool, Token} from '../model'
import {Action} from './base'

export interface CreateTokenActionData {
    tokenId: string
    address: string
    decimals: number
    symbol: string
}

export class CreateTokenAction extends Action<CreateTokenActionData> {
    async perform() {
        const decimals = this.data.decimals
        const symbol = this.data.symbol
        const token = new Token({
            id: this.data.tokenId,
            decimals,
            symbol
        })

        await this.store.upsert(token)
        this.log.debug(`Token ${token.id} created`)
    }
}

export interface TransferTokenActionData {
    tokenId: string
    fromId: string
    toId: string
}

export class TransferTokenAction extends Action<TransferTokenActionData> {
    async perform() {
        const token = await this.store.getOrFail(Token, this.data.tokenId)

        const timestamp = new Date(this.block.timestamp)

        await this.store.upsert(token)
    }
}

export type TokenAction = CreateTokenAction | TransferTokenAction
