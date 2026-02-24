import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { PasswordHasherService } from './password-hasher.service';
import { loginDTO, registerDTO } from './types/auth.dto';
import { EmailExistError, InvalidCredentialsError } from './errors/auth.errors';
import { EVENT_BUS, type EventBusPort} from 'src/core/events/event.bus';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AUTH_USER_REGISTERED_EVENT } from 'src/context/events/user-registered.event';
import { JWT_TOKEN_SERVICE, type JWTTokenPort } from './ports/jwt.port';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly passwordService: PasswordHasherService,
    @Inject(EVENT_BUS) private readonly eventBus: EventBusPort,
    private readonly eventEmitter: EventEmitter2,
    @Inject(JWT_TOKEN_SERVICE) private readonly tokenService: JWTTokenPort

  ) {}

  async register(registerDTO: registerDTO) {
    const emailExist = await this.authRepo.findCredentialByEmail(registerDTO.email);
    if (emailExist) throw new EmailExistError();

    const passwordHash = await this.passwordService.hash(registerDTO.password);

    const user = await this.authRepo.createCredential({
      email: registerDTO.email,
      passwordHash,
    });

    this.eventEmitter.emit(AUTH_USER_REGISTERED_EVENT, {
      email: user.email,
      id: user.id,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  async login(loginDTO: loginDTO) {
    const user = await this.authRepo.findCredentialByEmail(loginDTO.email);
    if (!user) throw new InvalidCredentialsError();

    const isPasswordValid = await this.passwordService.compare(
      loginDTO.password,
      user.passwordHash,
    );

    if (!isPasswordValid) throw new InvalidCredentialsError();

    const payload = {
      sub: user.id,
      email: user.email,
      permissions: user.permissions.toString(),
    };

  const accessToken = await this.tokenService.generateToken(payload, '1h');

  return {
      access_token: accessToken,
      user: {
          id: user.id,
          email: user.email,
          permissions: user.permissions.toString(),
      },
  };
  }

  async updatePermissions(
    id: string,
    permissions: bigint,
  ): Promise<{ id: string; email: string; permissions: string }> {
    const user = await this.authRepo.findById(id);
    if (!user) throw new NotFoundException(`User ${id} introuvable`);

    const updated = await this.authRepo.updatePermissions(id, permissions);

    return {
      id: updated.id,
      email: updated.email,
      permissions: updated.permissions.toString(),
    };
  }
}