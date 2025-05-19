import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { AccountEntity } from '../entities/account.entity';
import type { ProfileEntity } from '../entities/profile.entity';

export interface AccountsService {
  getAccountById(reqCtx: RequestContext, accountId: string): Promise<ResultOrExcluded<AccountEntity>>;
  getAccountRootProfile(reqCtx: RequestContext, accountId: string): Promise<ResultOrExcluded<ProfileEntity>>;
}

export const ACCOUNTS_SRV = 'ACCOUNTS_SRV' as InjectableIdentifier<AccountsService>;
