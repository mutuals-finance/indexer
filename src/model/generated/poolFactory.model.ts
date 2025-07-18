import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, ManyToOne as ManyToOne_, Index as Index_} from "@subsquid/typeorm-store"
import {Account} from "./account.model"

@Entity_()
export class PoolFactory {
    constructor(props?: Partial<PoolFactory>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    address!: string

    @IntColumn_({nullable: false})
    chainId!: number

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @IntColumn_({nullable: false})
    blockNumber!: number

    @IntColumn_({nullable: false})
    poolCount!: number

    @IntColumn_({nullable: false})
    txCount!: number

    @StringColumn_({nullable: false})
    ownerId!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    owner!: Account
}
