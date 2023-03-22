import { IsString, IsDefined } from "class-validator";
import "./";

export class Text_description {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    descriptions!: string;
}
