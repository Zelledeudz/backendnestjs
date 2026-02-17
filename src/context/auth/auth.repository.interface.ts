import { UserCredentialsEntity } from "./entities/user-credentials-entity";

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY')

export interface IAuthRepository {
    findCredentialByUsername(username: string): Promise<UserCredentialsEntity | null>;
    createCredential(username: string, passwordHash: string): Promise<UserCredentialsEntity>;
}