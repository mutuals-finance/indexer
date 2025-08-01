import {Extension} from "../model/generated";
import {ActionContext} from "../interfaces";
import {fetchers} from "./index";

export interface ClaimData {
    id: string
    value: bigint
    parentId: string
    recipient: string | undefined | null
    stateId: string
    strategyId: string
}

export abstract class BaseFetcher {
    protected constructor(public id: string) {}

    abstract fetchClaims(ctx: ActionContext, model: Extension, data: string): Promise<ClaimData[]>
}

export abstract class BaseExtension {
    protected constructor(protected model: Extension) {}
}

export class StateExtension extends BaseExtension {
    fetcher?: BaseFetcher

    constructor(model: Extension) {
        super(model)
        this.fetcher = fetchers[this.model.extensionId]
    }

    async fetchClaims(ctx: ActionContext, data: string): Promise<ClaimData[]>{
        return this.fetcher?.fetchClaims(ctx, this.model, data) ?? []
    }
}
