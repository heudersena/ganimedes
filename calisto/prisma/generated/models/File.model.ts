import { IsString, IsDefined, IsOptional, IsDate } from "class-validator";
import { Receipt } from "./";

export class File {
    @IsDefined()
    @IsString()
    id!: string;

    @IsOptional()
    @IsString()
    archived?: string;

    @IsDefined()
    Receipt!: Receipt[];

    @IsDefined()
    @IsDate()
    created_at!: Date;

    @IsDefined()
    @IsDate()
    updated_at!: Date;
}
