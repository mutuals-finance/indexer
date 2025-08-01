import {BaseFetcher} from "./base";
import onchainStateFetcher from "./onchainState";
import offchainStateFetcher from "./offchainState";

const all: BaseFetcher[] = [onchainStateFetcher, offchainStateFetcher]
export const fetchers: Record<string, BaseFetcher> = all.reduce((acc, fetcher) => ({...acc, ...{[fetcher.id]: fetcher}}), {})
