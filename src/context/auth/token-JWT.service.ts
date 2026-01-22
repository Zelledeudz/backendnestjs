import { Injectable } from "@nestjs/common";
import { JWTTokenPort } from "./ports/jwt.port";
import *  as jwt from 'jsonwebtoken'

@Injectable()

export class tokenJWTService implements JWTTokenPort {
    generateToken(payload: object): Promise<string> {
        return jwt.sign({payload});
    }
    verifyToken(token: string): Promise<object | null> {
        return jwt.verify(token, 'bar')
    }
    verifyAccessToken(token: string): Promise<object | null> {
        return jwt.verify(token, 'bar')
    }

}