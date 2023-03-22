import { Prisma } from "@prisma/client";
import { IsString, IsDefined, IsIn, IsOptional, IsDate } from "class-validator";
import { Transaction } from "./";
import { getEnumValues } from "../helpers";
import { action_rule, status_role } from "../enums";

export class MercadoPago {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    transaction_id!: string;

    @IsDefined()
    transaction!: Transaction;

    @IsDefined()
    @IsString()
    m_id!: string;

    @IsDefined()
    @IsIn(getEnumValues(action_rule))
    m_action!: action_rule;

    @IsDefined()
    @IsString()
    m_status!: string;

    @IsDefined()
    @IsIn(getEnumValues(status_role))
    m_status_detail!: status_role;

    @IsDefined()
    m_net_received_amount!: Prisma.Decimal;

    @IsDefined()
    m_total_paid_amount!: Prisma.Decimal;

    @IsDefined()
    @IsString()
    m_transaction_id!: string;

    @IsDefined()
    @IsString()
    m_qr_code!: string;

    @IsDefined()
    @IsString()
    m_ticket_url!: string;

    @IsOptional()
    @IsString()
    m_qr_code_base64?: string;

    @IsDefined()
    @IsDate()
    created_at!: Date;

    @IsDefined()
    @IsDate()
    updated_at!: Date;
}
