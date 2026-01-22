import { Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from './auth.repository.interface';
import type { IAuthRepository } from './auth.repository.interface'
import { PASSWORD_HASHER } from './ports/password-hasher.port';
import { PasswordHasherService } from './password-hasher.service';
import { loginDTO } from './types/auth.dto';

@Injectable()
export class authService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepo: IAuthRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordService: PasswordHasherService
  ){}

  async register (user: loginDTO) {

  const passwordHash = this.passwordService.hash(user.password)

  }

  async login (user: loginDTO) {
  
  // const passwordCheck = this.passwordService.compare(user.password, )
  }
}
