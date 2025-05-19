import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';

import type { ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { ACCOUNTS_SRV, AUTH_PROVIDERS_SRV, PROFILES_SRV, type ProfileEntity } from 'src/modules/acount';

import { AuthInvalidPwdError } from '../errors/auth-invalid-pwd.error';
import { AuthNotFoundError } from '../errors/auth-not-found.error';
import { AuthPwdIsNotSetError } from '../errors/auth-pwd-is-not-set.error';
import type { AuthService } from '../interfaces/auth.service.interface';
import { BCRYPT_SRV } from '../interfaces/bcrypt.service.interface';
import type { JWTTokenPayload } from '../interfaces/jwt-token';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(ACCOUNTS_SRV)
    private readonly accountSrv: IdentifierOf<typeof ACCOUNTS_SRV>,

    @Inject(PROFILES_SRV)
    private readonly profilesSrv: IdentifierOf<typeof PROFILES_SRV>,

    @Inject(AUTH_PROVIDERS_SRV)
    private readonly authProvidersSrv: IdentifierOf<typeof AUTH_PROVIDERS_SRV>,

    @Inject(BCRYPT_SRV)
    private readonly bcryptSrv: IdentifierOf<typeof BCRYPT_SRV>
  ) {}

  // TODO Think about Option and chaining
  async validateProfileByEmail(
    reqCtx: RequestContext,
    email: string,
    password: string
  ): Promise<ResultOrExcluded<ProfileEntity>> {
    const emailAuthProvider = await this.authProvidersSrv.getAuthProviderByEmail(reqCtx, email);
    if (Either.isLeft(emailAuthProvider)) throw new AuthNotFoundError();

    const passwordHash = emailAuthProvider.right.getPasswordHash();
    if (!passwordHash) throw new AuthPwdIsNotSetError();

    const pwdValid = await this.bcryptSrv.compare(password, passwordHash);
    if (!pwdValid) throw new AuthInvalidPwdError();

    return this.accountSrv.getAccountRootProfile(reqCtx, emailAuthProvider.right.accountId);
  }

  async validateProfileByJWTTokenPayload(
    reqCtx: RequestContext,
    payload: JWTTokenPayload
  ): Promise<ResultOrExcluded<ProfileEntity>> {
    return this.profilesSrv.getProfileById(reqCtx, payload.profileId);
  }
}
