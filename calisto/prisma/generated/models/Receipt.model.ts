import { IsString, IsDefined, IsBoolean, IsOptional, IsDate } from "class-validator";
import { Transaction, File } from "./";

export class Receipt {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsBoolean()
    is_paid!: boolean;

    @IsDefined()
    @IsString()
    transaction_id!: string;

    @IsOptional()
    @IsString()
    file_id?: string;

    @IsDefined()
    transaction!: Transaction;

    @IsOptional()
    file?: File;

    @IsDefined()
    @IsDate()
    created_at!: Date;

    @IsDefined()
    @IsDate()
    updated_at!: Date;
}
