import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, DateTimeColumn as DateTimeColumn_, IntColumn as IntColumn_, BigIntColumn as BigIntColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Deposit} from "./deposit.model"
import {Withdrawal} from "./withdrawal.model"

@Entity_()
export class Tx {
    constructor(props?: Partial<Tx>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @IntColumn_({nullable: false})
    blockNumber!: number

    @BigIntColumn_({nullable: false})
    gasUsed!: bigint

    @BigIntColumn_({nullable: false})
    gasPrice!: bigint

    @OneToMany_(() => Deposit, e => e.transaction)
    deposits!: Deposit[]

    @OneToMany_(() => Withdrawal, e => e.transaction)
    withdrawals!: Withdrawal[]
}
