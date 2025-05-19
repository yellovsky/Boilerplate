import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';

import { NotFoundReason, type ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { AccountEntity } from '../entities/account.entity';
import type { AccountsRepository } from '../interfaces/accounts.repository.interface';
import { type DBAccount, dbAccountSelect } from './accounts.repository.types';

@Injectable()
export class AccountsRepositoryImpl implements AccountsRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  async findAccountById(reqCtx: RequestContext, id: string): Promise<ResultOrExcluded<AccountEntity>> {
    const prisma = reqCtx.tx || this.prismaSrv;

    const dbAccount = await prisma.account.findUnique({
      select: dbAccountSelect,
      where: { id },
    });

    return !dbAccount ? Either.left(new NotFoundReason()) : Either.right(this.#toAccountEntity(dbAccount));
  }

  #toAccountEntity(dbAccount: DBAccount): AccountEntity {
    return AccountEntity.from({
      authProviders: dbAccount.authProviders,
      createdAt: dbAccount.createdAt,
      id: dbAccount.id,
      profiles: dbAccount.profiles,
      updatedAt: dbAccount.updatedAt,
    });
  }
}
