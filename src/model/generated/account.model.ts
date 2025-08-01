import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, OneToMany as OneToMany_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {AccountType} from "./_accountType"
import {Pool} from "./pool.model"
import {Claim} from "./claim.model"
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

    @Column_("varchar", {length: 8, nullable: false})
    accountType!: AccountType

    @OneToMany_(() => Pool, e => e.account)
    selfPools!: Pool[]

    @OneToMany_(() => Claim, e => e.recipient)
    claims!: Claim[]

    @OneToMany_(() => TokenBalance, e => e.holder)
    balances!: TokenBalance[]

    @IntColumn_({nullable: false})
    createdAtBlockNumber!: number

    @IntColumn_({nullable: false})
    updatedAtBlockNumber!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date
}
