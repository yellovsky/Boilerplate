import { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import { EmailAuthProviderEntity } from '../entities/auth-provider.entity';

export interface AuthProvidersRepository {
  findAuthProviderByEmail(email: string): Promise<EmailAuthProviderEntity | null>;
}

export const AUTH_PROVIDERS_REPO =
  'AUTH_PROVIDERS_REPO' as InjectableIdentifier<AuthProvidersRepository>;
