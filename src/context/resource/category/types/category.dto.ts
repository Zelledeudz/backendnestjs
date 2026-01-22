import { IsNumber, IsString } from "class-validator"

// Information d'entrée
export class categoryDTO {
    
    @IsString()
    nameCategory: string
}