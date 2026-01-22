import { Module } from '@nestjs/common';
import { authController } from './auth.controller'
import { authService } from './auth.service'
import { UserCredentialsEntity } from './entities/user-credentials-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AUTH_REPOSITORY } from './auth.repository.interface';
import { PASSWORD_HASHER } from './ports/password-hasher.port';
import { PasswordHasherService } from './password-hasher.service';
import { TOKEN_SERVICE } from './ports/jwt.port';

@Module({
    imports:[TypeOrmModule.forFeature([
        UserCredentialsEntity
    ])],
    controllers: [authController],
    providers: [authService,
        {provide: AUTH_REPOSITORY, useClass: AuthRepository},
        {provide: PASSWORD_HASHER, useClass: PasswordHasherService},
        // {provide: TOKEN_SERVICE, useClass:  }
    ],
    exports:[]
})
export class authModule {}