import {Pool, Token} from '../model'
import {Action} from './base'
import {createTokenId} from "../utils/ids";
import {config} from "../main";

export interface CreateTokenActionData {
    tokenAddress: string
    symbol: string
    name: string
    decimals: number
    logo?: string | null
    thumbnail?: string | null
    validated?: number
    possibleSpam?: boolean
}

export class CreateTokenAction extends Action<CreateTokenActionData> {
    async perform() {
        const {tokenAddress, ...data} = this.data
        const tokenId = createTokenId(this.data.tokenAddress)

        const token = new Token({
            id: tokenId,
            address: tokenAddress,
            chainId: config.chainId,
            ...data,
            ...this.updatedAt,
            ...this.createdAt
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
        const at = this.updatedAt
        token.updatedAtBlockNumber = at.updatedAtBlockNumber
        token.updatedAt = at.updatedAt
        await this.store.upsert(token)
    }
}

export type TokenAction = CreateTokenAction | TransferTokenAction
