import { Inject, Injectable } from '@nestjs/common';

import type { ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { AccountEntity } from '../entities/account.entity';
import type { ProfileEntity } from '../entities/profile.entity';
import { ACCOUNTS_REPO } from '../interfaces/accounts.repository.interface';
import type { AccountsService } from '../interfaces/accounts.service.interface';
import { PROFILES_REPO } from '../interfaces/profiles.repository.interface';

@Injectable()
export class AccountsServiceImpl implements AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPO)
    private readonly accountsRepo: IdentifierOf<typeof ACCOUNTS_REPO>,

    @Inject(PROFILES_REPO)
    private readonly profilesRepo: IdentifierOf<typeof PROFILES_REPO>
  ) {}

  getAccountById(reqCtx: RequestContext, id: string): Promise<ResultOrExcluded<AccountEntity>> {
    return this.accountsRepo.findAccountById(reqCtx, id);
  }

  getAccountRootProfile(reqCtx: RequestContext, accountId: string): Promise<ResultOrExcluded<ProfileEntity>> {
    return this.profilesRepo.findAccountRootProfile(reqCtx, accountId);
  }
}
