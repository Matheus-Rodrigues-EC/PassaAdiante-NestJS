import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto.js';
import { AuthService } from './auth.service.js';
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('login') login(@Body() input: LoginUserDto) {
    return this.auth.login(input);
  }
}
