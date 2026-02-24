import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { JWTTokenPort } from "./ports/jwt.port";

@Injectable()
export class TokenJWTService implements JWTTokenPort {
    private readonly secret = '78984562123963852789'; 

    async generateToken(payload: object, expiresIn?: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, { expiresIn: expiresIn || '12000s' }, (err, token) => {
                if (err) reject(err);
                else resolve(token as string);
            });
        });
    }

    async verifyToken(token: string): Promise<object | null> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) reject(err);
                else resolve((decoded as object) || null);
            });
        });
    }
}