import { IsString, IsDefined, IsBoolean, IsDate } from "class-validator";
import { Profile } from "./";

export class Term {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    profile!: Profile;

    @IsDefined()
    @IsString()
    profileId!: string;

    @IsDefined()
    @IsBoolean()
    is_accepted!: boolean;

    @IsDefined()
    @IsDate()
    created_at!: Date;

    @IsDefined()
    @IsDate()
    updated_at!: Date;
}
