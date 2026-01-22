import { IsString, IsStrongPassword } from "class-validator"

// Information d'entrée
export class loginDTO {

    @IsString()
    username!: string

    @IsStrongPassword()
    password!: string
}