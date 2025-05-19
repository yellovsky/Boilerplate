import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Either } from 'effect';
import type { Request } from 'express';
import { Strategy } from 'passport-local';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { requestContextFromRequest } from 'src/shared/utils/request-context';

import type { ProfileEntity } from 'src/modules/acount';

import { AUTH_SRV } from '../interfaces/auth.service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SRV)
    private readonly authSrv: IdentifierOf<typeof AUTH_SRV>
  ) {
    super({ passReqToCallback: true, usernameField: 'email' });
  }

  async validate(request: Request, email: string, password: string): Promise<ProfileEntity> {
    const reqCtx = requestContextFromRequest(request);
    return Either.getOrThrow(await this.authSrv.validateProfileByEmail(reqCtx, email, password));
  }
}
