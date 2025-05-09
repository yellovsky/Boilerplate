import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma';

import { ACCOUNTS_REPO } from './domain/interfaces/accounts.repository.interface';
import { ACCOUNTS_SRV } from './domain/interfaces/accounts.service.interface';
import { AUTH_PROVIDERS_REPO } from './domain/interfaces/auth-providers.repository.interface';
import { AUTH_PROVIDERS_SRV } from './domain/interfaces/auth-providers.service.interface';

import { AccountsServiceImpl } from './application/services/accounts.service';
import { AuthProvidersServiceImpl } from './application/services/auth-providers.service';

import { AccountsRepositoryImpl } from './infrastructure/repositories/accounts.repository';
import { AuthProvidersRepositoryImpl } from './infrastructure/repositories/auth-providers.repository';

@Module({
  exports: [ACCOUNTS_SRV, AUTH_PROVIDERS_SRV],
  imports: [PrismaModule],
  providers: [
    { provide: AUTH_PROVIDERS_REPO, useClass: AuthProvidersRepositoryImpl },
    { provide: AUTH_PROVIDERS_SRV, useClass: AuthProvidersServiceImpl },
    { provide: ACCOUNTS_REPO, useClass: AccountsRepositoryImpl },
    { provide: ACCOUNTS_SRV, useClass: AccountsServiceImpl },
  ],
})
export class AccountsModule {}
