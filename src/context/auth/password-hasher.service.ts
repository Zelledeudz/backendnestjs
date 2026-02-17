import { Injectable } from "@nestjs/common";
import { PasswordHasherPort } from "./ports/password-hasher.port";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHasherService implements PasswordHasherPort {
    
    hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10); // ✅ 10 au lieu de 1995 (1995 prendrait des heures!)
    }
    
    compare(password: string, hashedPassword: string): Promise<Boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}