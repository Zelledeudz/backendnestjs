import { Injectable } from "@nestjs/common";
import { UserCredentialsEntity } from "./entities/user-credentials-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IAuthRepository } from "./auth.repository.interface";
import { Repository } from "typeorm";

@Injectable()
export class AuthRepository implements IAuthRepository {
    constructor(
       @InjectRepository(UserCredentialsEntity) 
       private readonly credentialRepository: Repository<UserCredentialsEntity>
    ) {}

    async findCredentialByUsername(username: string): Promise<UserCredentialsEntity | null> {
        return await this.credentialRepository.findOne({ where: { username } });
    }

    async createCredential(username: string, passwordHash: string): Promise<UserCredentialsEntity> {
        const user = this.credentialRepository.create({ username, passwordHash });
        return await this.credentialRepository.save(user);
    }
}
