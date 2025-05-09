import { Inject, Injectable } from '@nestjs/common';

import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { AccountEntity, ACCOUNTS_SRV, AUTH_PROVIDERS_SRV } from 'src/modules/acount';

import { AuthInvalidPwdError } from '../../domain/errors/auth-invalid-pwd.error';
import { AuthNotFoundError } from '../../domain/errors/auth-not-found.error';
import { AuthPwdIsNotSetError } from '../../domain/errors/auth-pwd-is-not-set.error';
import { AuthService } from '../../domain/interfaces/auth.service.interface';
import { BCRYPT_SRV } from '../../domain/interfaces/bcrypt.service.interface';
import { JWTTokenPayload } from '../../domain/interfaces/jwt-token';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(ACCOUNTS_SRV)
    private readonly accountSrv: IdentifierOf<typeof ACCOUNTS_SRV>,

    @Inject(AUTH_PROVIDERS_SRV)
    private readonly authProvidersSrv: IdentifierOf<typeof AUTH_PROVIDERS_SRV>,

    @Inject(BCRYPT_SRV)
    private readonly bcryptSrv: IdentifierOf<typeof BCRYPT_SRV>,
  ) {}

  async validateAccountByEmail(email: string, password: string): Promise<AccountEntity> {
    const emailAuthProvider = await this.authProvidersSrv.getAuthProviderByEmail(email);
    if (!emailAuthProvider) throw new AuthNotFoundError();

    const passwordHash = emailAuthProvider.getPasswordHash();
    if (!passwordHash) throw new AuthPwdIsNotSetError();

    const pwdValid = await this.bcryptSrv.compare(password, passwordHash);
    if (!pwdValid) throw new AuthInvalidPwdError();

    const accountEntity = await this.accountSrv.getAccountById(emailAuthProvider.accountId);
    if (!accountEntity) throw new Error(`Account entity not foud for ${email} email`);

    return accountEntity;
  }

  async validateAccountByJWTTokenPayload(payload: JWTTokenPayload): Promise<AccountEntity> {
    const accountEntity = await this.accountSrv.getAccountById(payload.accountId);
    if (!accountEntity) throw new AuthNotFoundError();
    return accountEntity;
  }
}
