import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { PasswordHasherService } from './password-hasher.service';
import { loginDTO, registerDTO } from './types/auth.dto';
import { UsernameExistError, InvalidCredentialsError } from './errors/auth.errors';
import { EVENT_BUS, type EventBusPort} from 'src/core/events/event.bus';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AUTH_USER_REGISTERED_EVENT } from 'src/context/events/user-registered.event';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly passwordService: PasswordHasherService,
    @Inject(EVENT_BUS) private readonly eventBus : EventBusPort,
    private eventEmitter: EventEmitter2,
  ) {}

  async register(registerDTO: registerDTO) {
    // Vérifier si l'utilisateur existe déjà
    const userExist = await this.authRepo.findCredentialByUsername(registerDTO.username);
    if (userExist) throw new UsernameExistError();

    // Hasher le mot de passe
    const passwordHash = await this.passwordService.hash(registerDTO.password);
    
    // Créer l'utilisateur
    const user = await this.authRepo.createCredential(registerDTO.username, passwordHash);

    // Émettre l'événement d'inscription pour envoyer l'email
    this.eventEmitter.emit(AUTH_USER_REGISTERED_EVENT, {
      email: registerDTO.email, // ⬅️ Ajoutez email dans votre registerDTO si ce n'est pas déjà fait
      name: registerDTO.username,
      id: user.id,
    });

    return {
      id: user.id,
      username: user.username,
    };
  }

  async login(loginDTO: loginDTO) {
    const user = await this.authRepo.findCredentialByUsername(loginDTO.username);
    if (!user) throw new InvalidCredentialsError();

    const isPasswordValid = await this.passwordService.compare(loginDTO.password, user.passwordHash);
    if (!isPasswordValid) throw new InvalidCredentialsError();

    return {
      id: user.id,
      username: user.username,
    };
  }
}