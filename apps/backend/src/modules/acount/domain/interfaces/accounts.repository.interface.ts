import { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import { AccountEntity } from '../entities/account.entity';

export interface AccountsRepository {
  findAccountById(id: string): Promise<AccountEntity | null>;
}

export const ACCOUNTS_REPO = 'ACCOUNTS_REPO' as InjectableIdentifier<AccountsRepository>;
