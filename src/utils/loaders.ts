import fs from 'fs'

type PoolsMetadata = {
    height: number
    addresses: Record<string, string[]>
}

let pools: PoolsMetadata | undefined
export function loadPools(): PoolsMetadata {
    if (pools != null) return pools

    const file = fs.readFileSync('./assets/pools.json', 'utf-8')
    pools = JSON.parse(file) as PoolsMetadata
    return pools
}
