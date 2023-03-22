import { Prisma } from "@prisma/client";
import { IsString, IsDefined, IsDate } from "class-validator";
import "./";

export class Percentage_today {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    percentage!: Prisma.Decimal;

    @IsDefined()
    @IsDate()
    created_at!: Date;

    @IsDefined()
    @IsDate()
    updated_at!: Date;
}
