import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const functions = {
    uri: viewFun("0x0e89341c", "uri(uint256)", {"_id": p.uint256}, p.string),
}

export class Contract extends ContractBase {

    uri(_id: UriParams["_id"]) {
        return this.eth_call(functions.uri, {_id})
    }
}

/// Function types
export type UriParams = FunctionArguments<typeof functions.uri>
export type UriReturn = FunctionReturn<typeof functions.uri>

