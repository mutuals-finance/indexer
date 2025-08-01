import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {Pool} from "./pool.model"
import {Account} from "./account.model"
import {Extension} from "./extension.model"

@Entity_()
export class Claim {
    constructor(props?: Partial<Claim>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    value!: bigint

    @StringColumn_({nullable: true})
    parentId!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Claim, {nullable: true})
    parent!: Claim | undefined | null

    @StringColumn_({nullable: false})
    poolId!: string

    @Index_()
    @ManyToOne_(() => Pool, {nullable: true})
    pool!: Pool

    @StringColumn_({nullable: true})
    recipientId!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    recipient!: Account | undefined | null

    @StringColumn_({nullable: false})
    stateId!: string

    @Index_()
    @ManyToOne_(() => Extension, {nullable: true})
    state!: Extension

    @StringColumn_({nullable: false})
    strategyId!: string

    @Index_()
    @ManyToOne_(() => Extension, {nullable: true})
    strategy!: Extension

    @IntColumn_({nullable: false})
    createdAtBlockNumber!: number

    @IntColumn_({nullable: false})
    updatedAtBlockNumber!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date
}
