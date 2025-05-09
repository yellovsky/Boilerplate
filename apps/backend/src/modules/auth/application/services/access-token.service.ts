import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';

import { APP_CONFIG_SRV } from 'src/modules/app-config';
import { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { AccessTokenService } from '../../domain/interfaces/access-token.service.interface';
import { AuthInvalidTokenError } from '../../domain/errors/auth-invalid-token.error';
import { JWTTokenPayload } from '../../domain/interfaces/jwt-token';

export const isJWTTokenPayload = (payload: unknown): payload is JWTTokenPayload =>
  !!payload &&
  typeof payload === 'object' &&
  'accountId' in payload &&
  typeof payload.accountId === 'string';

@Injectable()
export class AccessTokenServiceImpl implements AccessTokenService {
  constructor(
    @Inject()
    private readonly jwtSrv: JwtService,

    @Inject(APP_CONFIG_SRV)
    private readonly appConfigSrv: IdentifierOf<typeof APP_CONFIG_SRV>,
  ) {}

  async generate(payload: JWTTokenPayload): Promise<string> {
    return this.jwtSrv.signAsync(payload, { secret: this.appConfigSrv.jwtSecret });
  }

  async parse(token: string): Promise<JWTTokenPayload> {
    try {
      const payload = await this.jwtSrv.verifyAsync(token, { secret: this.appConfigSrv.jwtSecret });
      return this.validate(payload);
    } catch {
      throw new AuthInvalidTokenError();
    }
  }

  async validate(payload: unknown): Promise<JWTTokenPayload> {
    if (!isJWTTokenPayload(payload)) throw new AuthInvalidTokenError();
    return payload;
  }
}
