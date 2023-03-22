import { Prisma } from "@prisma/client";
import { IsString, IsDefined, IsInt, IsIn, IsOptional, IsBoolean, IsDate } from "class-validator";
import { Profile, Receipt, MercadoPago } from "./";
import { getEnumValues } from "../helpers";
import { ROLE_TRANSACTION, mercado_pago_transaction_status_rules } from "../enums";

export class Transaction {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    profile!: Profile;

    @IsDefined()
    @IsString()
    profile_id!: string;

    @IsDefined()
    balance!: Prisma.Decimal;

    @IsDefined()
    bonus!: Prisma.Decimal;

    @IsDefined()
    @IsInt()
    percentage_bonus!: number;

    @IsDefined()
    @IsIn(getEnumValues(ROLE_TRANSACTION))
    type_transaction!: ROLE_TRANSACTION;

    @IsDefined()
    @IsIn(getEnumValues(mercado_pago_transaction_status_rules))
    mercado_pago_transaction_status!: mercado_pago_transaction_status_rules;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDefined()
    @IsBoolean()
    is_payment!: boolean;

    @IsDefined()
    @IsBoolean()
    is_employee_paid!: boolean;

    @IsDefined()
    @IsDate()
    created_at!: Date;

    @IsDefined()
    @IsDate()
    updated_at!: Date;

    @IsDefined()
    Receipt!: Receipt[];

    @IsDefined()
    MercadoPago!: MercadoPago[];
}
