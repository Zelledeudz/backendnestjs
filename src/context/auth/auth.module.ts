import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { UserCredentialsEntity } from './entities/user-credentials-entity';
import { PasswordHasherService } from './password-hasher.service';
import { SendUserRegisteredEventHandler } from './handlers/send-user-registered.handler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserCredentialsEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PasswordHasherService,
    SendUserRegisteredEventHandler,
  ],
  exports: [AuthService],
})
export class AuthModule {}