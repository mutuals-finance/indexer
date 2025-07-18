import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    BlockData as _BlockData,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as poolFactoryAbi from './abi/PoolFactory'
import * as erc20Abi from './abi/ERC20'
import {assertNotNull} from "@subsquid/util-internal";
import {NetworkConfig} from "./networkConfig";

export const makeProcessor = (config: NetworkConfig)=> new EvmBatchProcessor()
    .setBlockRange({from: config.startAtBlock})
    .setGateway(config.gatewaySqdUrl)
    .setRpcEndpoint({
      url: assertNotNull(
          config.rpcUrl,
          "Required env variable RPC_HTTP is missing"
      ),
    })
    .setFinalityConfirmation(config.finalityConfirmation)
    .setFields({
      log: {
        topics: true,
        data: true,
        sighash: true,
        status: true,
        input: true,
      },
      transaction: {
        from: true,
        hash: true,
        sighash: true,
        status: true,
        input: true,
      },
    })
    .addLog({
        topic0: [erc20Abi.events.Transfer.topic],
        transaction: true,
    })
    .addLog({
      address: [config.poolFactory],
      topic0: [poolFactoryAbi.events.OwnershipTransferred.topic, poolFactoryAbi.events.PoolCreated.topic],
      transaction: true,
    })

export type Fields = EvmBatchProcessorFields<ReturnType<typeof makeProcessor>>
export type BlockData = _BlockData<Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
