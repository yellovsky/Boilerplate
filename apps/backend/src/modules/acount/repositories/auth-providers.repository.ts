import { Inject, Injectable } from '@nestjs/common';
import { Either } from 'effect';

import { NotFoundReason, type ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { EmailAuthProviderEntity } from '../entities/auth-provider.entity';
import type { AuthProvidersRepository } from '../interfaces/auth-providers.repository.interface';
import { type DBAuthProvider, dbAuthProvidersSelect } from './auth-providers.repository.types';

@Injectable()
export class AuthProvidersRepositoryImpl implements AuthProvidersRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  async findAuthProviderByEmail(
    txCtx: TxRequestContext,
    email: string
  ): Promise<ResultOrExcluded<EmailAuthProviderEntity>> {
    const prisma = txCtx.tx || this.prismaSrv;

    const dbAuthProvider = await prisma.authProvider.findFirst({ select: dbAuthProvidersSelect, where: { email } });

    if (!dbAuthProvider) return Either.left(new NotFoundReason());
    return this.#toEmailAuthProviderEntity(dbAuthProvider);
  }

  #toEmailAuthProviderEntity(dbAuthProvider: DBAuthProvider): ResultOrExcluded<EmailAuthProviderEntity> {
    // TODO Return proper error
    if (!dbAuthProvider.email || dbAuthProvider.providerType !== 'EMAIL') return Either.left(new NotFoundReason());

    return Either.right(
      EmailAuthProviderEntity.from({
        accountId: dbAuthProvider.accountId,
        createdAt: dbAuthProvider.createdAt,
        email: dbAuthProvider.email,
        id: dbAuthProvider.id,
        passwordHash: dbAuthProvider.passwordHash,
        providerType: 'email',
        updatedAt: dbAuthProvider.updatedAt,
      })
    );
  }
}
