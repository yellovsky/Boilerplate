import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma';

import { ACCOUNTS_REPO } from './interfaces/accounts.repository.interface';
import { ACCOUNTS_SRV } from './interfaces/accounts.service.interface';
import { AUTH_PROVIDERS_REPO } from './interfaces/auth-providers.repository.interface';
import { AUTH_PROVIDERS_SRV } from './interfaces/auth-providers.service.interface';
import { PROFILES_REPO } from './interfaces/profiles.repository.interface';
import { PROFILES_SRV } from './interfaces/profiles.service.interface';
import { AccountsRepositoryImpl } from './repositories/accounts.repository';
import { AuthProvidersRepositoryImpl } from './repositories/auth-providers.repository';
import { ProfilesRepositoryImpl } from './repositories/profiles.repository';
import { AccountsServiceImpl } from './services/accounts.service';
import { AuthProvidersServiceImpl } from './services/auth-providers.service';
import { ProfilesServiceImpl } from './services/profiles.service';

@Module({
  exports: [ACCOUNTS_SRV, AUTH_PROVIDERS_SRV, PROFILES_SRV],
  imports: [PrismaModule],
  providers: [
    { provide: AUTH_PROVIDERS_REPO, useClass: AuthProvidersRepositoryImpl },
    { provide: AUTH_PROVIDERS_SRV, useClass: AuthProvidersServiceImpl },
    { provide: ACCOUNTS_REPO, useClass: AccountsRepositoryImpl },
    { provide: PROFILES_REPO, useClass: ProfilesRepositoryImpl },
    { provide: ACCOUNTS_SRV, useClass: AccountsServiceImpl },
    { provide: PROFILES_SRV, useClass: ProfilesServiceImpl },
  ],
})
export class AccountsModule {}
