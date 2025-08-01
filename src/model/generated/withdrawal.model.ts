import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {Tx} from "./tx.model"
import {Pool} from "./pool.model"
import {Token} from "./token.model"

@Entity_()
export class Withdrawal {
    constructor(props?: Partial<Withdrawal>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    transactionId!: string

    @Index_()
    @ManyToOne_(() => Tx, {nullable: true})
    transaction!: Tx

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

    @StringColumn_({nullable: false})
    from!: string

    @StringColumn_({nullable: false})
    to!: string

    @StringColumn_({nullable: false})
    origin!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @IntColumn_({nullable: true})
    logIndex!: number | undefined | null

    @IntColumn_({nullable: false})
    createdAtBlockNumber!: number

    @IntColumn_({nullable: false})
    updatedAtBlockNumber!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date
}
