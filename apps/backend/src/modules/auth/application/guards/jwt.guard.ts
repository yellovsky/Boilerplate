import { AuthGuard } from '@nestjs/passport';
import type { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { IS_PUBLIC_KEY } from 'src/shared/application/decorators/public';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    return super.canActivate(context);
  }
}
