import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { AccountEntity } from '../entities/account.entity';

export interface AccountsService {
  getAccountById(id: string): Promise<AccountEntity | null>;
}

export const ACCOUNTS_SRV = 'ACCOUNTS_SRV' as InjectableIdentifier<AccountsService>;
