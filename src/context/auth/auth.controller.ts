import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { loginDTO } from './types/auth.dto';
import { UserLoggedPresenter } from './types/auth.presenter';

@Controller('auth')
export class authController {
    constructor(

    ){}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: loginDTO): UserLoggedPresenter {

    const infoBDD = {username: 'UnUsername', password: 'Password123!'}

    return plainToInstance(UserLoggedPresenter, infoBDD , { excludeExtraneousValues: true})
  }

}