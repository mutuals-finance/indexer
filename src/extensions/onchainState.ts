import {Claim, Extension} from "../model/generated";
import {BaseFetcher, ClaimData} from "./base";
import {ActionContext} from "../interfaces";

class OnchainStateFetcher extends BaseFetcher {
    constructor() {
        super("OnchainState")
    }

    async fetchClaims(ctx: ActionContext, model: Extension, data: string) {
        const claims: ClaimData[] = []; //  abi.decode(data, (Claim[]))
        return claims
    }
}

export default new OnchainStateFetcher()
