import { IsDateString, IsNumber, IsString } from "class-validator";
import { RcsCategoryEntity } from "../../category/entities/category-entity";

export class RcsFilmDTO {
    @IsString()
    title: string

    @IsString()
    description: string;

    @IsDateString()
    release: Date

    /* @IsString()
    category: RcsCategoryEntity["nameCategory"] */
}