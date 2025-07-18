import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"
import {Tx} from "./tx.model"
import {Pool} from "./pool.model"
import {Token} from "./token.model"

@Entity_()
export class Deposit {
    constructor(props?: Partial<Deposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    transactionId!: string

    @Index_()
    @ManyToOne_(() => Tx, {nullable: true})
    transaction!: Tx

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

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
}
