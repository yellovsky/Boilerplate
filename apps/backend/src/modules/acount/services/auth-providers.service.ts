import { Inject, Injectable } from '@nestjs/common';

import type { ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { EmailAuthProviderEntity } from '../entities/auth-provider.entity';
import { AUTH_PROVIDERS_REPO } from '../interfaces/auth-providers.repository.interface';
import type { AuthProvidersService } from '../interfaces/auth-providers.service.interface';

@Injectable()
export class AuthProvidersServiceImpl implements AuthProvidersService {
  constructor(
    @Inject(AUTH_PROVIDERS_REPO)
    private readonly authProvidersRepo: IdentifierOf<typeof AUTH_PROVIDERS_REPO>
  ) {}

  getAuthProviderByEmail(reqCtx: RequestContext, email: string): Promise<ResultOrExcluded<EmailAuthProviderEntity>> {
    return this.authProvidersRepo.findAuthProviderByEmail(reqCtx, email);
  }
}
