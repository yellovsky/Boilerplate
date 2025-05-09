import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_SRV } from 'src/modules/prisma';

import { AuthProvidersRepository } from '../../domain/interfaces/auth-providers.repository.interface';
import { EmailAuthProviderEntity } from '../../domain/entities/auth-provider.entity';

@Injectable()
export class AuthProvidersRepositoryImpl implements AuthProvidersRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,
  ) {}

  async findAuthProviderByEmail(email: string): Promise<EmailAuthProviderEntity | null> {
    const dbAuthProvider = await this.prismaSrv.authProvider.findFirst({ where: { email } });

    if (!dbAuthProvider) return null;
    if (!dbAuthProvider.email || dbAuthProvider.providerType !== 'EMAIL') return null;

    return EmailAuthProviderEntity.from({
      accountId: dbAuthProvider.accountId,
      createdAt: dbAuthProvider.createdAt,
      email: dbAuthProvider.email,
      id: dbAuthProvider.id,
      passwordHash: dbAuthProvider.passwordHash,
      providerType: 'email',
      updatedAt: dbAuthProvider.updatedAt,
    });
  }
}
