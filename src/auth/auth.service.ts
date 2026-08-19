import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../users/dto/login-user.dto.js';
import { sanitizeUser, UsersRepository } from '../users/users.repository.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersRepository,
    private readonly jwt: JwtService,
  ) {}
  async login(input: LoginUserDto) {
    const user = await this.users.findByEmail(input.email);
    if (!user || !(await bcrypt.compare(input.password, user.password)))
      throw new UnauthorizedException('E-mail ou senha inválidos');
    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      type: user.type,
    });
    return { accessToken, user: sanitizeUser(user) };
  }
}
