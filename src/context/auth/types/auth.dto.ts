import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class loginDTO {
    @IsString()
    username!: string;

    @IsStrongPassword()
    password!: string;
}

export class registerDTO {
    @IsString()
    username!: string;

    @IsStrongPassword()
    password!: string;

    @IsEmail()
    email!: string;
}
