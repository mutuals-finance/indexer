import {NetworkConfig, networkConfig} from "../networkConfig";
import assert from "assert";

export function initNetworkConfig(chainTag: string): NetworkConfig {
    assert(
        networkConfig.hasOwnProperty(chainTag),
        `Processor executable takes one argument - a network string ID - ` +
        `that must be in ${JSON.stringify(Object.keys(networkConfig))}. Got "${
            chainTag
        }".`
    );

    return networkConfig[chainTag];
}

export function getNetworkConfig(chainTag: string): NetworkConfig {
    const config = networkConfig[chainTag];
    if (!config) {
        throw new Error(`Chain configuration not found for: ${chainTag}`);
    }
    return config;
}

// Export individual configs for backward compatibility if needed
export const holeskyConfig = networkConfig.holesky;
