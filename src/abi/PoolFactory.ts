import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    PoolCreated: event("0x8ddf34ddd96931cdf83e601e01b38725f5ca889ae6635fe4dd7f15a65d0af67e", "PoolCreated(address,address,address,bytes32[],bytes[])", {"pool": indexed(p.address), "owner": indexed(p.address), "registry": indexed(p.address), "extensions": p.array(p.bytes32), "data": p.array(p.bytes)}),
    Upgraded: event("0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b", "Upgraded(address)", {"implementation": indexed(p.address)}),
}

export const functions = {
    UPGRADE_INTERFACE_VERSION: viewFun("0xad3cb1cc", "UPGRADE_INTERFACE_VERSION()", {}, p.string),
    __PoolFactory_init: fun("0x3368f9ec", "__PoolFactory_init(address,address)", {"_owner": p.address, "_beacon": p.address}, ),
    beacon: viewFun("0x59659e90", "beacon()", {}, p.address),
    createPool: fun("0xaf3ffc4d", "createPool(address,address,bytes32[],bytes[],uint256)", {"_initialOwner": p.address, "_registry": p.address, "_extensions": p.array(p.bytes32), "_data": p.array(p.bytes), "_salt": p.uint256}, ),
    created: viewFun("0xd42efd83", "created(address)", {"pool": p.address}, p.bool),
    getAddress: viewFun("0x3a98159f", "getAddress(address,address,bytes32[],bytes[],uint256)", {"_initialOwner": p.address, "_registry": p.address, "_extensions": p.array(p.bytes32), "_data": p.array(p.bytes), "_salt": p.uint256}, p.address),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    proxiableUUID: viewFun("0x52d1902d", "proxiableUUID()", {}, p.bytes32),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    upgradeToAndCall: fun("0x4f1ef286", "upgradeToAndCall(address,bytes)", {"newImplementation": p.address, "data": p.bytes}, ),
}

export class Contract extends ContractBase {

    UPGRADE_INTERFACE_VERSION() {
        return this.eth_call(functions.UPGRADE_INTERFACE_VERSION, {})
    }

    beacon() {
        return this.eth_call(functions.beacon, {})
    }

    created(pool: CreatedParams["pool"]) {
        return this.eth_call(functions.created, {pool})
    }

    getAddress(_initialOwner: GetAddressParams["_initialOwner"], _registry: GetAddressParams["_registry"], _extensions: GetAddressParams["_extensions"], _data: GetAddressParams["_data"], _salt: GetAddressParams["_salt"]) {
        return this.eth_call(functions.getAddress, {_initialOwner, _registry, _extensions, _data, _salt})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    proxiableUUID() {
        return this.eth_call(functions.proxiableUUID, {})
    }
}

/// Event types
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PoolCreatedEventArgs = EParams<typeof events.PoolCreated>
export type UpgradedEventArgs = EParams<typeof events.Upgraded>

/// Function types
export type UPGRADE_INTERFACE_VERSIONParams = FunctionArguments<typeof functions.UPGRADE_INTERFACE_VERSION>
export type UPGRADE_INTERFACE_VERSIONReturn = FunctionReturn<typeof functions.UPGRADE_INTERFACE_VERSION>

export type __PoolFactory_initParams = FunctionArguments<typeof functions.__PoolFactory_init>
export type __PoolFactory_initReturn = FunctionReturn<typeof functions.__PoolFactory_init>

export type BeaconParams = FunctionArguments<typeof functions.beacon>
export type BeaconReturn = FunctionReturn<typeof functions.beacon>

export type CreatePoolParams = FunctionArguments<typeof functions.createPool>
export type CreatePoolReturn = FunctionReturn<typeof functions.createPool>

export type CreatedParams = FunctionArguments<typeof functions.created>
export type CreatedReturn = FunctionReturn<typeof functions.created>

export type GetAddressParams = FunctionArguments<typeof functions.getAddress>
export type GetAddressReturn = FunctionReturn<typeof functions.getAddress>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type ProxiableUUIDParams = FunctionArguments<typeof functions.proxiableUUID>
export type ProxiableUUIDReturn = FunctionReturn<typeof functions.proxiableUUID>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UpgradeToAndCallParams = FunctionArguments<typeof functions.upgradeToAndCall>
export type UpgradeToAndCallReturn = FunctionReturn<typeof functions.upgradeToAndCall>

