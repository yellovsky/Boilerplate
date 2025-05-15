import { Inject, Injectable } from '@nestjs/common';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { ACCOUNTS_SRV, AUTH_PROVIDERS_SRV, type ProfileEntity } from 'src/modules/acount';

import { AuthInvalidPwdError } from '../../domain/errors/auth-invalid-pwd.error';
import { AuthNotFoundError } from '../../domain/errors/auth-not-found.error';
import { AuthPwdIsNotSetError } from '../../domain/errors/auth-pwd-is-not-set.error';
import type { AuthService } from '../../domain/interfaces/auth.service.interface';
import { BCRYPT_SRV } from '../../domain/interfaces/bcrypt.service.interface';
import type { JWTTokenPayload } from '../../domain/interfaces/jwt-token';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(ACCOUNTS_SRV)
    private readonly accountSrv: IdentifierOf<typeof ACCOUNTS_SRV>,

    @Inject(AUTH_PROVIDERS_SRV)
    private readonly authProvidersSrv: IdentifierOf<typeof AUTH_PROVIDERS_SRV>,

    @Inject(BCRYPT_SRV)
    private readonly bcryptSrv: IdentifierOf<typeof BCRYPT_SRV>
  ) {}

  async validateProfileByEmail(email: string, password: string): Promise<ProfileEntity> {
    const emailAuthProvider = await this.authProvidersSrv.getAuthProviderByEmail(email);
    if (!emailAuthProvider) throw new AuthNotFoundError();

    const passwordHash = emailAuthProvider.getPasswordHash();
    if (!passwordHash) throw new AuthPwdIsNotSetError();

    const pwdValid = await this.bcryptSrv.compare(password, passwordHash);
    if (!pwdValid) throw new AuthInvalidPwdError();

    // TODO Get profile directly
    const accountEntity = await this.accountSrv.getAccountById(emailAuthProvider.accountId);
    if (!accountEntity) throw new Error(`Account entity not foud for ${email} email`);

    const profile = accountEntity.profiles.find((p) => p.isRoot);
    if (!profile) throw new Error(`Account with ${email} email has no root profile`);

    return profile;
  }

  async validateProfileByJWTTokenPayload(payload: JWTTokenPayload): Promise<ProfileEntity> {
    // TODO Get profile directly
    const accountEntity = await this.accountSrv.getAccountById(payload.accountId);
    if (!accountEntity) throw new AuthNotFoundError();

    const profile = accountEntity.profiles.find((p) => payload.profileId === p.id);
    if (!profile) throw new Error(`Account ${payload.accountId} has no ${payload.profileId} profile`);

    return profile;
  }
}
