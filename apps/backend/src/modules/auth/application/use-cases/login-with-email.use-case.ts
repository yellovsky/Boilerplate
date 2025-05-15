import { Inject, Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';
import type { Request, Response } from 'express';

import type { LoginWithEmailBody } from '@repo/api-models';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { ACCOUNTS_SRV, AUTH_PROVIDERS_SRV } from 'src/modules/acount';

import { ACCESS_TOKEN_COOKIE_KEY } from '../../config/constants';
import { ACCESS_TOKEN_SRV } from '../../domain/interfaces/access-token.service.interface';
import { LoginWithEmailResponseDto } from '../dto/login-with-email-response.dto';

@Injectable()
export class LoginWithEmailUseCase {
  constructor(
    @Inject(ACCESS_TOKEN_SRV)
    private readonly accessTokenSrv: IdentifierOf<typeof ACCESS_TOKEN_SRV>,

    @Inject(ACCOUNTS_SRV)
    private readonly accountSrv: IdentifierOf<typeof ACCOUNTS_SRV>,

    @Inject(AUTH_PROVIDERS_SRV)
    private readonly authProviderSrv: IdentifierOf<typeof AUTH_PROVIDERS_SRV>
  ) {}

  async execute(body: LoginWithEmailBody, req: Request, res: Response): Promise<LoginWithEmailResponseDto> {
    const authProvider = await this.authProviderSrv.getAuthProviderByEmail(body.email);

    if (!authProvider) throw new Error(`Auth provider with ${body.email} email not found`);

    const account = await this.accountSrv.getAccountById(authProvider.accountId);
    if (!account) throw new Error(`Account with ${body.email} email not found`);

    const profileId = account.profiles.at(0)?.id;
    if (!profileId) throw new Error(`Account with ${body.email} has no profiles`);

    const accessToken = await this.accessTokenSrv.generate({
      accountId: authProvider.accountId,
      profileId,
    });

    res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
      domain: req.hostname,
      expires: addDays(Date.now(), 7),
      httpOnly: true,
      sameSite: 'lax',
    });

    return new LoginWithEmailResponseDto();
  }
}
