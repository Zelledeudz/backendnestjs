import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO, registerDTO } from './types/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: registerDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: loginDTO) {
    return this.authService.login(body);
  }
}
