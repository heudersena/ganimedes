import { Prisma } from "@prisma/client";
import { IsString, IsDefined, IsOptional, IsIn, IsDate } from "class-validator";
import { Transaction, Term, Accumulator_bonus } from "./";
import { getEnumValues } from "../helpers";
import { ROLE_PROFILE } from "../enums";

export class Profile {
    @IsDefined()
    @IsString()
    id!: string;

    @IsOptional()
    @IsString()
    keycloak_id?: string;

    @IsDefined()
    @IsString()
    first_name!: string;

    @IsDefined()
    @IsString()
    second_name!: string;

    @IsDefined()
    @IsString()
    email!: string;

    @IsOptional()
    @IsString()
    cpf?: string;

    @IsOptional()
    balance?: Prisma.Decimal;

    @IsOptional()
    bonus?: Prisma.Decimal;

    @IsDefined()
    @IsString()
    phone!: string;

    @IsDefined()
    @IsString()
    keyPix!: string;

    @IsDefined()
    @IsIn(getEnumValues(ROLE_PROFILE))
    type_profile!: ROLE_PROFILE;

    @IsDefined()
    @IsString()
    reference_code!: string;

    @IsDefined()
    @IsDate()
    created_at!: Date;

    @IsDefined()
    @IsDate()
    updated_at!: Date;

    @IsDefined()
    Transaction!: Transaction[];

    @IsDefined()
    Terms!: Term[];

    @IsDefined()
    Accumulator_bonus!: Accumulator_bonus[];
}
