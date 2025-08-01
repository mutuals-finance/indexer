import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, ManyToOne as ManyToOne_, Index as Index_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {Account} from "./account.model"

@Entity_()
export class ExtensionRegistry {
    constructor(props?: Partial<ExtensionRegistry>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    address!: string

    @IntColumn_({nullable: false})
    chainId!: number

    @IntColumn_({nullable: false})
    extensionCount!: number

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
}
