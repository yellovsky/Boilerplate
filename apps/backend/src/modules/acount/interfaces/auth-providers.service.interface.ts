import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { EmailAuthProviderEntity } from '../entities/auth-provider.entity';

export interface AuthProvidersService {
  getAuthProviderByEmail(reqCtx: RequestContext, email: string): Promise<ResultOrExcluded<EmailAuthProviderEntity>>;
}

export const AUTH_PROVIDERS_SRV = 'AUTH_PROVIDERS_SRV' as InjectableIdentifier<AuthProvidersService>;
