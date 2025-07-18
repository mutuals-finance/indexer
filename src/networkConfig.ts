import {assertNotNull} from "@subsquid/util-internal";

export type NetworkConfig = {
  poolFactory: string;
  poolFactoryFirstBlock: number;
  multicall: string;
  chainId: number;
  chainTag: string;
  nativeName: string;
  nativeSymbol: string;
  nativeDecimals: number;
  rpcUrl: string;
  gatewaySqdUrl: string;
  zeroAddress: string;
  startAtBlock: number;
  finalityConfirmation: number;
  permissionRecordTx: {
    tokenBalanceHour: boolean,
    tokenBalanceDay: boolean,
  };
};

export const networkConfig: Record<string, NetworkConfig> = {
  holesky: {
    poolFactory: "0x0D18C5203c227284cf101d447d4cE90c2ae8b906".toLowerCase(),
    poolFactoryFirstBlock: 4082934,
    multicall: "0xca11bde05977b3631167028862be2a173976ca11".toLowerCase(),
    chainId: 17000,
    chainTag: "holesky",
    nativeName: "Ether",
    nativeSymbol: "ETH",
    nativeDecimals: 18,
    rpcUrl: assertNotNull(
        process.env.RPC_HOLESKY_HTTP,
        "No HOLESKY RPC endpoint supplied via env.RPC_HOLESKY_HTTP"
    ),
    gatewaySqdUrl: "https://v2.archive.subsquid.io/network/ethereum-holesky",
    zeroAddress: "0x0000000000000000000000000000000000000000".toLowerCase(),
    finalityConfirmation: 75,
    startAtBlock: 4082934,
    permissionRecordTx: {
      tokenBalanceHour: true,
      tokenBalanceDay: true,
    },
  },
};
