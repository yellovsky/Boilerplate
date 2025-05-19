import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { AccountsModule } from 'src/modules/acount';
import { APP_CONFIG_SRV, AppConfigModule } from 'src/modules/app-config';
import { PrismaModule } from 'src/modules/prisma';

import { AuthControllerV1 } from './auth.controller-v1';
import { ACCESS_TOKEN_SRV } from './interfaces/access-token.service.interface';
import { AUTH_SRV } from './interfaces/auth.service.interface';
import { BCRYPT_SRV } from './interfaces/bcrypt.service.interface';
import { AccessTokenServiceImpl } from './services/access-token.service';
import { AuthServiceImpl } from './services/auth.service';
import { BcryptServiceImpl } from './services/bcrypt.service';
import { LocalStrategy } from './strategies/local.strategy';
import { IsAuthorizedUseCase } from './use-cases/is-authorized.use-case';
import { LoginWithEmailUseCase } from './use-cases/login-with-email.use-case';
import { LogoutUseCase } from './use-cases/logout.use-case';

@Module({
  controllers: [AuthControllerV1],
  exports: [AUTH_SRV],
  imports: [
    AccountsModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [APP_CONFIG_SRV],
      useFactory: async (appConfigSrv: IdentifierOf<typeof APP_CONFIG_SRV>) => ({
        secret: appConfigSrv.jwtSecret,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [
    LoginWithEmailUseCase,
    IsAuthorizedUseCase,
    LogoutUseCase,
    LocalStrategy,
    { provide: ACCESS_TOKEN_SRV, useClass: AccessTokenServiceImpl },
    { provide: BCRYPT_SRV, useClass: BcryptServiceImpl },
    { provide: AUTH_SRV, useClass: AuthServiceImpl },
  ],
})
export class AuthModule {}
