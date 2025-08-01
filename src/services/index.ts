import {IPFSService} from "./ipfs";
import {MoralisService} from "./moralis";

export type ServiceContext = {
    ipfsService: IPFSService,
    moralisService: MoralisService,
}

export * from "./ipfs"
export * from "./moralis"
