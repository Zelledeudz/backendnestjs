import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { RcsCategoryEntity } from "../../category/entities/category-entity";

export class RcsFilmDTO {
    @IsString()
    title: string

    @IsString()
    description: string;

    @IsDateString()
    release: Date

    @IsString()
    category: string
}

export class UpdateFilmDTO {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    release?: Date

    @IsOptional()
    @IsString()
    category?: string
}