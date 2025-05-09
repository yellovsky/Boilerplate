import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';

import { AccountEntity } from 'src/modules/acount';
import { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { AUTH_SRV } from '../../domain/interfaces/auth.service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SRV)
    private readonly authSrv: IdentifierOf<typeof AUTH_SRV>,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AccountEntity> {
    return this.authSrv.validateAccountByEmail(email, password);
  }
}
