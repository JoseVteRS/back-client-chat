import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  handleRequest(err: any, user: any, info: any, context, status?: any) {
    const token = context.getRequest().headers['authorization'];

    if (!token) throw new UnauthorizedException('Token do not valid');

    return user;
  }
}
