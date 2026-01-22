import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

// Information de sortie 
export class categoryPresenter{
    @Expose()
    @IsNumber()
    id: number

    @IsString()
    nameCategory: string

    @IsNumber()
    releaseCategory: Date
}