import { config } from "../main";

export const createPoolFactoryId = (poolFactoryAddress: string) => {
    return `${config.chainId}-${poolFactoryAddress}`;
};

export const createAccountId = (accountAddress: string) => {
    return `${accountAddress}`;
};

export const createTokenId = (tokenAddress: string) => {
    return `${config.chainId}-${tokenAddress}`;
};

export const createNFTId = (
    nftAddress: string,
    nftId: bigint | number
) => {
    return `${config.chainId}-${nftAddress}-${nftId}`;
};

export const createExtensionId = (extensionAddress: string) => {
    return `${config.chainId}-${extensionAddress}`;
};
export const createPoolId = (poolAddress: string) => {
    return `${config.chainId}-${poolAddress}`;
};

/*
export const createPoolDayDataId = (poolAddress: string, timestamp: number) => {
    let dayIndex = createDayIndex(timestamp);
    return `${config.chainId}-${poolAddress}-${dayIndex}`;
};
export const createTokenDayDataId = (tokenId: string, timestamp: number) => {
    let dayIndex = createDayIndex(timestamp);
    return `${tokenId}-${dayIndex}`;
};
export const createPoolHourDataId = (poolAddress: string, timestamp: number) => {
    let hourIndex = createHourIndex(timestamp);
    return `${config.chainId}-${poolAddress}-${hourIndex}`;
};
export const createTokenHourDataId = (tokenId: string, timestamp: number) => {
    let hourIndex = createHourIndex(timestamp);
    return `${tokenId}-${hourIndex}`;
};
*/
