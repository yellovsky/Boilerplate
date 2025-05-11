import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';

import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { ProfileEntity } from 'src/modules/acount';

import { AUTH_SRV } from '../../domain/interfaces/auth.service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SRV)
    private readonly authSrv: IdentifierOf<typeof AUTH_SRV>,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<ProfileEntity> {
    return this.authSrv.validateProfileByEmail(email, password);
  }
}
