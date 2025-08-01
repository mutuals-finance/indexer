import {Account, Claim, Extension, ExtensionType, Pool} from '../model'
import {Action} from './base'
import {createAccountId, createClaimId} from "../utils/ids";
import {In} from "typeorm";
import {CachedDeferredQueue} from "../utils/deferred";
import {StateExtension} from "../extensions";

export interface CreateClaimBatchData {
    poolId: string;
    extensions: string[]
    data: string[]
}

export class CreateClaimBatchAction extends Action<CreateClaimBatchData> {
    async perform(): Promise<void> {
        const extensionIds = this.data.extensions.map(e => createAccountId(e.toLowerCase()))
        const pool = await this.store.getOrFail(Pool, this.data.poolId)
        const extensions = await this.store.findBy(Extension, {id: In(extensionIds)})

        const claimDataList = await Promise.all(
            extensions.map(async (extension) => {
                const i = extensionIds.indexOf(extension.id)
                return new StateExtension(extension).fetchClaims(this.ctx, this.data.data[i])
            })
        ).then(list => list.flat())

        const extensionQueue = new CachedDeferredQueue(
            (id: string) => this.store.getOrFail(Extension, id),
            ({id}) =>id
        )

        const accountQueue = new CachedDeferredQueue(
            (id?: string | null) => !id ? Promise.resolve(null) : this.store.getOrFail(Account, id),
            (account) => account?.id ?? 'null'
        )

        for (const claimData of claimDataList) {
            extensionQueue.push(claimData.stateId)
            extensionQueue.push(claimData.strategyId)
            accountQueue.push(claimData.recipient)
        }

        const [extensionResults, accountResults] = await Promise.all([
            extensionQueue.runAll(),
            accountQueue.runAll()
        ])

        const claims = claimDataList.map((claimData, index) => {
            const state = extensionResults[index * 2]
            const strategy = extensionResults[index * 2 + 1]
            const recipient = accountResults[index]

            return new Claim({
                id: createClaimId(pool.address, claimData.id),
                value: claimData.value,
                parentId: createClaimId(pool.address, claimData.parentId),
                recipientId: claimData.recipient,
                recipient,
                stateId: claimData.stateId,
                state,
                strategyId: claimData.strategyId,
                strategy,
                poolId: pool.id,
                pool: pool,
                ...this.createdAt,
                ...this.updatedAt
            })
        })

        await this.store.insert(claims)

        this.log.debug(`Created ${claims.length} claims`)
    }
}
