import { Prisma } from "@prisma/client";
import { IsString, IsDefined, IsDate } from "class-validator";
import { Profile } from "./";

export class Accumulator_bonus {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    profile!: Profile;

    @IsDefined()
    @IsString()
    profile_id!: string;

    @IsDefined()
    bonus_amount!: Prisma.Decimal;

    @IsDefined()
    @IsDate()
    created_at!: Date;

    @IsDefined()
    @IsDate()
    updated_at!: Date;
}
