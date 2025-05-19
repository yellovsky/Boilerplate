import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { EmailAuthProviderEntity } from '../entities/auth-provider.entity';

export interface AuthProvidersRepository {
  findAuthProviderByEmail(txCtx: TxRequestContext, email: string): Promise<ResultOrExcluded<EmailAuthProviderEntity>>;
}

export const AUTH_PROVIDERS_REPO = 'AUTH_PROVIDERS_REPO' as InjectableIdentifier<AuthProvidersRepository>;
