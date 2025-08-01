import {BaseFetcher, ClaimData} from "./base";
import {IndexerContext} from "../interfaces";   // Assuming you have this type
import { Extension } from '../model/generated';

class OffchainStateFetcher extends BaseFetcher {
    constructor() {
        super("OffchainState")
    }

    async fetchClaims(ctx: IndexerContext, model: Extension, data: string) {
        const cid = "" // JSON.parse(data)
        return ctx.ipfsService.fetchJSON<ClaimData[]>(ctx, `ipfs/${cid}`)
    }
}

export default new OffchainStateFetcher()
