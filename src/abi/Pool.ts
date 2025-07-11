import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    Paused: event("0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258", "Paused(address)", {"account": p.address}),
    Unpaused: event("0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa", "Unpaused(address)", {"account": p.address}),
    Withdrawal: event("0x2717ead6b9200dd235aad468c9809ea400fe33ac69b5bfaa6d3e90fc922b6398", "Withdrawal(address,address,uint256)", {"recipient": indexed(p.address), "token": indexed(p.address), "amount": p.uint256}),
}

export const functions = {
    __Pool_init: fun("0x919769d6", "__Pool_init(address,address,bytes32[],bytes[])", {"_initialOwner": p.address, "_registry": p.address, "_extensions": p.array(p.bytes32), "_data": p.array(p.bytes)}, ),
    batchWithdraw: fun("0x38c43756", "batchWithdraw((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes)[],(uint256,address,bytes,bytes)[])", {"claims": p.array(p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes})), "params": p.array(p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes}))}, ),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    pause: fun("0x8456cb59", "pause()", {}, ),
    paused: viewFun("0x5c975abb", "paused()", {}, p.bool),
    releasable: viewFun("0xc730fe30", "releasable((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes),(uint256,address,bytes,bytes))", {"claim": p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes}), "params": p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes})}, p.uint256),
    released: viewFun("0xdebf7697", "released(uint256,address)", {"claimId": p.uint256, "token": p.address}, p.uint256),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    totalReceived: viewFun("0x4df9cfb3", "totalReceived(address)", {"token": p.address}, p.uint256),
    totalReleased: viewFun("0xd79779b2", "totalReleased(address)", {"token": p.address}, p.uint256),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    unpause: fun("0x3f4ba83a", "unpause()", {}, ),
    withdraw: fun("0x4de300e4", "withdraw((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes),(uint256,address,bytes,bytes))", {"claim": p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes}), "params": p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes})}, ),
}

export class Contract extends ContractBase {

    owner() {
        return this.eth_call(functions.owner, {})
    }

    paused() {
        return this.eth_call(functions.paused, {})
    }

    releasable(claim: ReleasableParams["claim"], params: ReleasableParams["params"]) {
        return this.eth_call(functions.releasable, {claim, params})
    }

    released(claimId: ReleasedParams["claimId"], token: ReleasedParams["token"]) {
        return this.eth_call(functions.released, {claimId, token})
    }

    totalReceived(token: TotalReceivedParams["token"]) {
        return this.eth_call(functions.totalReceived, {token})
    }

    totalReleased(token: TotalReleasedParams["token"]) {
        return this.eth_call(functions.totalReleased, {token})
    }
}

/// Event types
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PausedEventArgs = EParams<typeof events.Paused>
export type UnpausedEventArgs = EParams<typeof events.Unpaused>
export type WithdrawalEventArgs = EParams<typeof events.Withdrawal>

/// Function types
export type __Pool_initParams = FunctionArguments<typeof functions.__Pool_init>
export type __Pool_initReturn = FunctionReturn<typeof functions.__Pool_init>

export type BatchWithdrawParams = FunctionArguments<typeof functions.batchWithdraw>
export type BatchWithdrawReturn = FunctionReturn<typeof functions.batchWithdraw>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type PausedParams = FunctionArguments<typeof functions.paused>
export type PausedReturn = FunctionReturn<typeof functions.paused>

export type ReleasableParams = FunctionArguments<typeof functions.releasable>
export type ReleasableReturn = FunctionReturn<typeof functions.releasable>

export type ReleasedParams = FunctionArguments<typeof functions.released>
export type ReleasedReturn = FunctionReturn<typeof functions.released>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type TotalReceivedParams = FunctionArguments<typeof functions.totalReceived>
export type TotalReceivedReturn = FunctionReturn<typeof functions.totalReceived>

export type TotalReleasedParams = FunctionArguments<typeof functions.totalReleased>
export type TotalReleasedReturn = FunctionReturn<typeof functions.totalReleased>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UnpauseParams = FunctionArguments<typeof functions.unpause>
export type UnpauseReturn = FunctionReturn<typeof functions.unpause>

export type WithdrawParams = FunctionArguments<typeof functions.withdraw>
export type WithdrawReturn = FunctionReturn<typeof functions.withdraw>

