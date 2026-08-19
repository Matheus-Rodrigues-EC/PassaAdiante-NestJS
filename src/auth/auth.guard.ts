import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest, AuthUser } from './auth.types.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const headers = request.headers as unknown as Record<
      string,
      string | undefined
    >;
    const token = headers.authorization?.startsWith('Bearer ')
      ? headers.authorization.slice(7)
      : undefined;
    if (!token)
      throw new UnauthorizedException('Token de acesso não informado');
    try {
      request.user = await this.jwt.verifyAsync<AuthUser>(token);
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
