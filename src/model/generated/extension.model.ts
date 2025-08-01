import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, ManyToOne as ManyToOne_, Index as Index_, JSONColumn as JSONColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {ExtensionRegistry} from "./extensionRegistry.model"
import {ExtensionType} from "./_extensionType"

@Entity_()
export class Extension {
    constructor(props?: Partial<Extension>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    address!: string

    @IntColumn_({nullable: false})
    chainId!: number

    @StringColumn_({nullable: false})
    extensionRegistryId!: string

    @Index_()
    @ManyToOne_(() => ExtensionRegistry, {nullable: true})
    extensionRegistry!: ExtensionRegistry

    @StringColumn_({nullable: false})
    extensionId!: string

    @Column_("varchar", {length: 8, nullable: false})
    extensionType!: ExtensionType

    @StringColumn_({array: true, nullable: true})
    permissions!: (string)[] | undefined | null

    @JSONColumn_({nullable: true})
    data!: unknown | undefined | null

    @StringColumn_({nullable: false})
    name!: string

    @StringColumn_({nullable: false})
    description!: string

    @IntColumn_({nullable: false})
    createdAtBlockNumber!: number

    @IntColumn_({nullable: false})
    updatedAtBlockNumber!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date
}
