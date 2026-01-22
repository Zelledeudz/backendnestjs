import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { RcsCategoryEntity } from "../../category/entities/category-entity";

// Information de sortie 
export class FilmPresenter{
    @Expose()
    @IsNumber()
    id: number

    @IsString()
    titre: string

    @IsNumber()
    release: Date

    @IsString()
    category: RcsCategoryEntity
}