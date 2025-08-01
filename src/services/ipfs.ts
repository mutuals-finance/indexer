import { HttpAgent, HttpClient, HttpClientOptions } from '@subsquid/http-client'
import {ActionContext, IndexerContext} from "../interfaces";
import {BaseService} from "./baseService";
import {ProcessorContext} from "../processor";

interface IPFSServiceConfig extends Omit<HttpClientOptions, "agent"> {
    gateway: string
    agent?: {
        keepAlive?: boolean
        timeout?: number
    }
}

export class IPFSFetchError extends Error {
    constructor(
        public readonly uri: string,
        public readonly gatewayUrl: string,
        public readonly originalError: Error
    ) {
        super(`Failed to fetch IPFS data from ${uri} via ${gatewayUrl}: ${originalError.message}`)
        this.name = 'IPFSFetchError'
    }
}

export class IPFSService extends BaseService {

    static init({
        headers = { 'Content-Type': 'application/json' },
        retryAttempts = 5,
        gateway,
        agent,
        ...httpConfig
    }: IPFSServiceConfig) {
        const config = {
            headers,
            retryAttempts,
            gateway,
            ...httpConfig
        }

        const client = new HttpClient({
            ...httpConfig,
            headers,
            retryAttempts,
            agent: new HttpAgent({
                keepAlive: agent?.keepAlive ?? true,
                timeout: agent?.timeout,
            }),
        })

        return new IPFSService(client, config)
    }

    constructor(
        private client: HttpClient,
        private config: IPFSServiceConfig
    ) {
        super()
    }

    /**
     * Fetches and parses JSON data from IPFS
     */
    async fetchJSON<T = unknown>(ctx: ActionContext, uri: string): Promise<T> {
        const gatewayUrl = this.buildGatewayUrl(uri)

        try {
            ctx.log.debug({ uri, gatewayUrl }, `Fetching IPFS data`)
            const response = await this.client.get(gatewayUrl)
            ctx.log.info({ uri }, `Successfully fetched IPFS data`)
            return response as T
        } catch (error) {
            const fetchError = new IPFSFetchError(uri, gatewayUrl, error as Error)
            ctx.log.error({ uri, gatewayUrl, error: (error as Error).message }, `IPFS fetch failed`)
            throw fetchError
        }
    }

    /**
     * Builds the complete gateway URL from an IPFS URI
     */
    private buildGatewayUrl(uri: string): string {
        if (uri.startsWith('ipfs://')) {
            const hash = uri.replace('ipfs://', '')
            return `${this.config.gateway}/ipfs/${hash}`
        }

        if (uri.startsWith('Qm') || uri.startsWith('bafy')) {
            return `${this.config.gateway}/ipfs/${uri}`
        }

        if (uri.startsWith('http')) {
            return uri
        }

        return new URL(uri, this.config.gateway).toString()
    }

    /**
     * Validates if a string looks like an IPFS hash
     */
    static isValidIPFSHash(hash: string): boolean {
        return /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|bafy[a-z0-9]{55})$/.test(hash)
    }
}
