import { Inject, Injectable } from '@nestjs/common';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import type { AccountEntity } from '../../domain/entities/account.entity';
import { ACCOUNTS_REPO } from '../../domain/interfaces/accounts.repository.interface';
import type { AccountsService } from '../../domain/interfaces/accounts.service.interface';

@Injectable()
export class AccountsServiceImpl implements AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPO)
    private readonly accountsRepo: IdentifierOf<typeof ACCOUNTS_REPO>
  ) {}

  getAccountById(id: string): Promise<AccountEntity | null> {
    return this.accountsRepo.findAccountById(id);
  }
}
