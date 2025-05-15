import { Inject, Injectable } from '@nestjs/common';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { PRISMA_SRV } from 'src/modules/prisma';

import { AccountEntity } from '../../domain/entities/account.entity';
import type { AccountsRepository } from '../../domain/interfaces/accounts.repository.interface';

@Injectable()
export class AccountsRepositoryImpl implements AccountsRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  async findAccountById(id: string): Promise<AccountEntity | null> {
    const dbAccount = await this.prismaSrv.account.findUnique({
      include: { authProviders: true, profiles: true },
      where: { id },
    });
    if (!dbAccount) return null;

    return AccountEntity.from({
      authProviders: dbAccount.authProviders,
      createdAt: dbAccount.createdAt,
      id: dbAccount.id,
      profiles: dbAccount.profiles,
      updatedAt: dbAccount.updatedAt,
    });
  }
}
