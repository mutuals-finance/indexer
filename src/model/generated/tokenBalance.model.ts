import {BigDecimal} from "@subsquid/big-decimal"
import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_, BigDecimalColumn as BigDecimalColumn_} from "@subsquid/typeorm-store"
import {Token} from "./token.model"
import {Account} from "./account.model"

@Entity_()
export class TokenBalance {
    constructor(props?: Partial<TokenBalance>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    chainId!: number

    @StringColumn_({nullable: false})
    tokenID!: string

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token!: Token

    @StringColumn_({nullable: false})
    holderID!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    holder!: Account

    @BigDecimalColumn_({nullable: false})
    amount!: BigDecimal
}
