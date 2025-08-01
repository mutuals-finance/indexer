import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Deposit} from "./deposit.model"
import {Withdrawal} from "./withdrawal.model"

@Entity_()
export class Tx {
    constructor(props?: Partial<Tx>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    gasUsed!: bigint

    @BigIntColumn_({nullable: false})
    gasPrice!: bigint

    @IntColumn_({nullable: false})
    createdAtBlockNumber!: number

    @IntColumn_({nullable: false})
    updatedAtBlockNumber!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @OneToMany_(() => Deposit, e => e.transaction)
    deposits!: Deposit[]

    @OneToMany_(() => Withdrawal, e => e.transaction)
    withdrawals!: Withdrawal[]
}
