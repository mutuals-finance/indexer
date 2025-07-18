import {NetworkConfig, networkConfig} from "../networkConfig";

export function getNetworkConfig(chainTag: string): NetworkConfig {
    const config = networkConfig[chainTag];
    if (!config) {
        throw new Error(`Chain configuration not found for: ${chainTag}`);
    }
    return config;
}

// Export individual configs for backward compatibility if needed
export const holeskyConfig = networkConfig.holesky;
