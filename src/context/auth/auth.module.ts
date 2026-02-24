import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { UserCredentialsEntity } from './entities/user-credentials-entity';
import { PasswordHasherService } from './password-hasher.service';
import { SendUserRegisteredEventHandler } from './handlers/send-user-registered.handler';
import { ConfigModule } from '@nestjs/config';
import { TokenJWTService } from './token-JWT.service';
import { JWT_TOKEN_SERVICE } from './ports/jwt.port';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserCredentialsEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PasswordHasherService,
    SendUserRegisteredEventHandler,
      {provide: JWT_TOKEN_SERVICE, useClass: TokenJWTService },
    TokenJWTService, 
    ],
  exports: [JWT_TOKEN_SERVICE, TokenJWTService, AuthService],
})
export class AuthModule {}