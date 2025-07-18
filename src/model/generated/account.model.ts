import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_, Index as Index_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Pool} from "./pool.model"
import {TokenBalance} from "./tokenBalance.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    address!: string

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @IntColumn_({nullable: false})
    blockNumber!: number

    @Index_()
    @BooleanColumn_({nullable: false})
    isEOA!: boolean

    @IntColumn_({nullable: false})
    txCount!: number

    @OneToMany_(() => Pool, e => e.account)
    pools!: Pool[]

    @OneToMany_(() => TokenBalance, e => e.holder)
    balances!: TokenBalance[]
}
