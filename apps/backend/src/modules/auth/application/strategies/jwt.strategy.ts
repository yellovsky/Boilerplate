import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';

import { APP_CONFIG_SRV } from 'src/modules/app-config';
import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { ProfileEntity } from 'src/modules/acount';

import { ACCESS_TOKEN_COOKIE_KEY } from '../../config/constants';
import { AUTH_SRV } from '../../domain/interfaces/auth.service.interface';
import { JWTTokenPayload } from '../../domain/interfaces/jwt-token';

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
    readonly appConfigSrv: IdentifierOf<typeof APP_CONFIG_SRV>,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwtFromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: appConfigSrv.jwtSecret,
    });
  }

  async validate(payload: JWTTokenPayload): Promise<ProfileEntity> {
    return this.authSrv.validateProfileByJWTTokenPayload(payload);
  }
}
