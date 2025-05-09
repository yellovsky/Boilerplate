import { Inject, Injectable } from '@nestjs/common';

import { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { AUTH_PROVIDERS_REPO } from '../../domain/interfaces/auth-providers.repository.interface';
import { AuthProvidersService } from '../../domain/interfaces/auth-providers.service.interface';
import { EmailAuthProviderEntity } from '../../domain/entities/auth-provider.entity';

@Injectable()
export class AuthProvidersServiceImpl implements AuthProvidersService {
  constructor(
    @Inject(AUTH_PROVIDERS_REPO)
    private readonly authProvidersRepo: IdentifierOf<typeof AUTH_PROVIDERS_REPO>,
  ) {}

  getAuthProviderByEmail(email: string): Promise<EmailAuthProviderEntity | null> {
    return this.authProvidersRepo.findAuthProviderByEmail(email);
  }
}
