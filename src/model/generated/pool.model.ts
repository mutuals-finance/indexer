import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, ManyToOne as ManyToOne_, Index as Index_, DateTimeColumn as DateTimeColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {PoolFactory} from "./poolFactory.model"
import {Account} from "./account.model"
import {Claim} from "./claim.model"
import {PoolDayBalance} from "./poolDayBalance.model"
import {PoolHourBalance} from "./poolHourBalance.model"
import {Deposit} from "./deposit.model"
import {Withdrawal} from "./withdrawal.model"

@Entity_()
export class Pool {
    constructor(props?: Partial<Pool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    address!: string

    @IntColumn_({nullable: false})
    chainId!: number

    @StringColumn_({nullable: false})
    poolFactoryId!: string

    @Index_()
    @ManyToOne_(() => PoolFactory, {nullable: true})
    poolFactory!: PoolFactory

    @StringColumn_({nullable: false})
    accountId!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account

    @StringColumn_({nullable: false})
    name!: string

    @StringColumn_({nullable: false})
    description!: string

    @StringColumn_({nullable: false})
    logo!: string

    @StringColumn_({nullable: false})
    ownerId!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    owner!: Account

    @IntColumn_({nullable: false})
    createdAtBlockNumber!: number

    @IntColumn_({nullable: false})
    updatedAtBlockNumber!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @OneToMany_(() => Claim, e => e.pool)
    claims!: Claim[]

    @OneToMany_(() => PoolDayBalance, e => e.pool)
    dayBalance!: PoolDayBalance[]

    @OneToMany_(() => PoolHourBalance, e => e.pool)
    hourBalance!: PoolHourBalance[]

    @OneToMany_(() => Deposit, e => e.pool)
    deposits!: Deposit[]

    @OneToMany_(() => Withdrawal, e => e.pool)
    withdrawals!: Withdrawal[]
}
