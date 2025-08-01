import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import {Pool} from "./pool.model"
import {Token} from "./token.model"

@Entity_()
export class PoolHourBalance {
    constructor(props?: Partial<PoolHourBalance>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    chainId!: number

    @DateTimeColumn_({nullable: false})
    date!: Date

    @StringColumn_({nullable: false})
    poolId!: string

    @Index_()
    @ManyToOne_(() => Pool, {nullable: true})
    pool!: Pool

    @StringColumn_({nullable: false})
    tokenId!: string

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token!: Token

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @IntColumn_({nullable: false})
    createdAtBlockNumber!: number

    @IntColumn_({nullable: false})
    updatedAtBlockNumber!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date
}
