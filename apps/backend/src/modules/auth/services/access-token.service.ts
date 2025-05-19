import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { APP_CONFIG_SRV } from 'src/modules/app-config';

import { AuthInvalidTokenError } from '../errors/auth-invalid-token.error';
import type { AccessTokenService } from '../interfaces/access-token.service.interface';
import type { JWTTokenPayload } from '../interfaces/jwt-token';

const isJWTTokenPayload = (payload: unknown): payload is JWTTokenPayload =>
  !!payload && typeof payload === 'object' && 'accountId' in payload && typeof payload.accountId === 'string';

@Injectable()
export class AccessTokenServiceImpl implements AccessTokenService {
  constructor(
    @Inject(JwtService)
    private readonly jwtSrv: JwtService,

    @Inject(APP_CONFIG_SRV)
    private readonly appConfigSrv: IdentifierOf<typeof APP_CONFIG_SRV>
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
