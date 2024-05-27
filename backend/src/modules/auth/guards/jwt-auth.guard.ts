import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    const allowAny = this.reflector.get<boolean>(
      'allow-any',
      context.getHandler(),
    );

    if (user) {
      return user;
    }
    if (allowAny) {
      return null;
    }
    throw new UnauthorizedException();
  }
}
