import {ActionQueue} from './action/actionQueue'
import {StoreWithCache} from "@belopash/typeorm-store";
import {ServiceContext} from "./services";
import {ProcessorContext} from "./processor";

export type ActionContext = ProcessorContext<StoreWithCache> & ServiceContext

export type IndexerContext = ActionContext & {
    queue: ActionQueue
}
