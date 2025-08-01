import Moralis, {MoralisConfigValues} from "moralis";
import {BaseService} from "./baseService";
import {ProcessorContext} from "../processor";
import {ActionContext} from "../interfaces";

type MoralisServiceConfig = MoralisConfigValues

export class MoralisService extends BaseService {

    static async init(config: MoralisServiceConfig) {
        await Moralis.start(config);
        return new MoralisService(config)
    }

    constructor(private config: MoralisServiceConfig) {
        super()
    }

    async fetchTokenMetadata(
        ctx: ActionContext,
        address: string
    ) {
        return this.fetchBatchTokenMetadata(ctx, [address]).then(([metadata]) => metadata)
    }

    async fetchBatchTokenMetadata(
        ctx: ActionContext,
        addresses: string[] = []
    ) {
        return Moralis.EvmApi.token.getTokenMetadata({
            addresses,
        }).then(({result}) =>
            result.map(({token, validated})=>({
                    symbol: token.symbol,
                    name: token.name,
                    decimals: token.decimals,
                    logo: token.logo,
                    thumbnail: token.thumbnail,
                    validated: validated,
                    possibleSpam: token.possibleSpam
                })
            ));
    }
}
