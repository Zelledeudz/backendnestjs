import { Expose } from "class-transformer";
import { IsString } from "class-validator";

// Information de sortie 
export class UserLoggedPresenter{
    @Expose()
    @IsString()
    username: String

}