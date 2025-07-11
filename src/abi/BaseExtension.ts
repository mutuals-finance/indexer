import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const functions = {
    afterBatchWithdraw: fun("0x77d63e17", "afterBatchWithdraw((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes)[],(uint256,address,bytes,bytes)[])", {"claims": p.array(p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes})), "params": p.array(p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes}))}, ),
    afterInitialize: fun("0xa58b1277", "afterInitialize(bytes)", {"data": p.bytes}, ),
    afterInitializePool: fun("0xef40dc09", "afterInitializePool(bytes)", {"data": p.bytes}, ),
    afterWithdraw: fun("0x405b7950", "afterWithdraw((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes),(uint256,address,bytes,bytes))", {"claim": p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes}), "params": p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes})}, ),
    beforeBatchWithdraw: fun("0x31526dae", "beforeBatchWithdraw((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes)[],(uint256,address,bytes,bytes)[])", {"claims": p.array(p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes})), "params": p.array(p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes}))}, ),
    beforeInitialize: fun("0x971b7aa7", "beforeInitialize(bytes)", {"data": p.bytes}, ),
    beforeInitializePool: fun("0x19bbe29c", "beforeInitializePool(bytes)", {"data": p.bytes}, ),
    beforeWithdraw: fun("0x5f6df45e", "beforeWithdraw((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes),(uint256,address,bytes,bytes))", {"claim": p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes}), "params": p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes})}, ),
    checkBatchState: viewFun("0x2ad45de1", "checkBatchState((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes)[],(uint256,address,bytes,bytes)[])", {"claims": p.array(p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes})), "params": p.array(p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes}))}, ),
    checkState: viewFun("0x75170a32", "checkState((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes),(uint256,address,bytes,bytes))", {"claim": p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes}), "params": p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes})}, ),
    extensionId: viewFun("0x62d7076e", "extensionId()", {}, p.bytes32),
    extensionName: viewFun("0x1c86100f", "extensionName()", {}, p.string),
    initialize: fun("0xc4d66de8", "initialize(address)", {"__factory": p.address}, ),
    releasable: viewFun("0xc730fe30", "releasable((uint256,uint256,address,uint256,bytes32,bytes,bytes32,bytes),(uint256,address,bytes,bytes))", {"claim": p.struct({"id": p.uint256, "parentId": p.uint256, "recipient": p.address, "value": p.uint256, "stateId": p.bytes32, "stateData": p.bytes, "strategyId": p.bytes32, "strategyData": p.bytes}), "params": p.struct({"amount": p.uint256, "token": p.address, "strategyData": p.bytes, "stateData": p.bytes})}, p.uint256),
}

export class Contract extends ContractBase {

    extensionId() {
        return this.eth_call(functions.extensionId, {})
    }

    extensionName() {
        return this.eth_call(functions.extensionName, {})
    }

    releasable(claim: ReleasableParams["claim"], params: ReleasableParams["params"]) {
        return this.eth_call(functions.releasable, {claim, params})
    }
}

/// Function types
export type AfterBatchWithdrawParams = FunctionArguments<typeof functions.afterBatchWithdraw>
export type AfterBatchWithdrawReturn = FunctionReturn<typeof functions.afterBatchWithdraw>

export type AfterInitializeParams = FunctionArguments<typeof functions.afterInitialize>
export type AfterInitializeReturn = FunctionReturn<typeof functions.afterInitialize>

export type AfterInitializePoolParams = FunctionArguments<typeof functions.afterInitializePool>
export type AfterInitializePoolReturn = FunctionReturn<typeof functions.afterInitializePool>

export type AfterWithdrawParams = FunctionArguments<typeof functions.afterWithdraw>
export type AfterWithdrawReturn = FunctionReturn<typeof functions.afterWithdraw>

export type BeforeBatchWithdrawParams = FunctionArguments<typeof functions.beforeBatchWithdraw>
export type BeforeBatchWithdrawReturn = FunctionReturn<typeof functions.beforeBatchWithdraw>

export type BeforeInitializeParams = FunctionArguments<typeof functions.beforeInitialize>
export type BeforeInitializeReturn = FunctionReturn<typeof functions.beforeInitialize>

export type BeforeInitializePoolParams = FunctionArguments<typeof functions.beforeInitializePool>
export type BeforeInitializePoolReturn = FunctionReturn<typeof functions.beforeInitializePool>

export type BeforeWithdrawParams = FunctionArguments<typeof functions.beforeWithdraw>
export type BeforeWithdrawReturn = FunctionReturn<typeof functions.beforeWithdraw>

export type CheckBatchStateParams = FunctionArguments<typeof functions.checkBatchState>
export type CheckBatchStateReturn = FunctionReturn<typeof functions.checkBatchState>

export type CheckStateParams = FunctionArguments<typeof functions.checkState>
export type CheckStateReturn = FunctionReturn<typeof functions.checkState>

export type ExtensionIdParams = FunctionArguments<typeof functions.extensionId>
export type ExtensionIdReturn = FunctionReturn<typeof functions.extensionId>

export type ExtensionNameParams = FunctionArguments<typeof functions.extensionName>
export type ExtensionNameReturn = FunctionReturn<typeof functions.extensionName>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type ReleasableParams = FunctionArguments<typeof functions.releasable>
export type ReleasableReturn = FunctionReturn<typeof functions.releasable>

