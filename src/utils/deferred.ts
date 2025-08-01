export class DeferredQueue<TFetcher extends (...args: any[]) => Promise<any>> {
    protected queue: Array<() => ReturnType<TFetcher>> = []

    constructor(protected fetcher: TFetcher) {}

    push(...args: Parameters<TFetcher>): Array<() => ReturnType<TFetcher>> {
        this.queue.push(() => this.fetcher(...args) as ReturnType<TFetcher>)
        return this.queue
    }

    run(): Promise<Awaited<ReturnType<TFetcher>>>[] {
        return this.queue.map(f => f())
    }

    async runAll(): Promise<Awaited<ReturnType<TFetcher>>[]> {
        return Promise.all(this.run())
    }
}

export class CachedDeferredQueue<TFetcher extends (...args: any[]) => Promise<any>> extends DeferredQueue<TFetcher> {
    private cache = new Map<string, Awaited<ReturnType<TFetcher>>>()

    constructor(
        fetcher: TFetcher,
        private keyExtractor?: (result: Awaited<ReturnType<TFetcher>>, ...args: Parameters<TFetcher>) => string
    ) {
        super(fetcher)
    }

    push(...args: Parameters<TFetcher>): Array<() => ReturnType<TFetcher>> {
        const asyncFunction = async () => {
            const argKey = args[0]?.toString()
            if (argKey && this.cache.has(argKey)) {
                return this.cache.get(argKey)!
            }

            const result = await this.fetcher(...args)

            if (result !== null && result !== undefined) {
                const key = this.keyExtractor
                    ? this.keyExtractor(result, ...args)
                    : argKey

                if (key) {
                    this.cache.set(key, result)
                }
            }

            return result
        }

        this.queue.push(asyncFunction as () => ReturnType<TFetcher>)
        return this.queue
    }
}

export class DeferredFunction<T> implements DeferredValue<T> {
    constructor(private f: () => Promise<T>) {}

    async get(): Promise<T> {
        return await this.f()
    }
}

export class WrappedValue<T> implements DeferredValue<T> {
    constructor(private value: T) {}

    async get(): Promise<T> {
        return this.value
    }
}

export interface DeferredValue<T, Nullable extends boolean = false> {
    get(): Promise<Nullable extends true ? T | undefined : T>
}
