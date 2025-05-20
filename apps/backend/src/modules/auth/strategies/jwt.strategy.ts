import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Either } from 'effect';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { requestContextFromRequest } from 'src/shared/utils/request-context';

import type { ProfileEntity } from 'src/modules/acount';
import { APP_CONFIG_SRV } from 'src/modules/app-config';

import { ACCESS_TOKEN_COOKIE_KEY } from '../config/constants';
import { AUTH_SRV } from '../interfaces/auth.service.interface';
import type { JWTTokenPayload } from '../interfaces/jwt-token';

const ExtractJwtFromCookies = (req: Request): string | null => {
  const access_token = req.cookies?.[ACCESS_TOKEN_COOKIE_KEY];
  return typeof access_token === 'string' && access_token.length ? access_token : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SRV)
    private readonly authSrv: IdentifierOf<typeof AUTH_SRV>,

    @Inject(APP_CONFIG_SRV)
    readonly appConfigSrv: IdentifierOf<typeof APP_CONFIG_SRV>
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwtFromCookies, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      passReqToCallback: true,
      secretOrKey: appConfigSrv.jwtSecret,
    });
  }

  async validate(request: Request, payload: JWTTokenPayload): Promise<ProfileEntity> {
    const reqCtx = requestContextFromRequest(request);

    return Either.getOrThrowWith(
      await this.authSrv.validateProfileByJWTTokenPayload(reqCtx, payload),
      () => new Error(`Account ${payload.accountId} has no ${payload.profileId} profile`)
    );
  }
}
