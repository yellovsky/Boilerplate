import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { EmailAuthProviderEntity } from '../entities/auth-provider.entity';

export interface AuthProvidersService {
  getAuthProviderByEmail(email: string): Promise<EmailAuthProviderEntity | null>;
}

export const AUTH_PROVIDERS_SRV = 'AUTH_PROVIDERS_SRV' as InjectableIdentifier<AuthProvidersService>;
