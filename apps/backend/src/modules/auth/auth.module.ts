import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AccountsModule } from 'src/modules/acount';
import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { PrismaModule } from 'src/modules/prisma';
import { APP_CONFIG_SRV, AppConfigModule } from 'src/modules/app-config';

import { ACCESS_TOKEN_SRV } from './domain/interfaces/access-token.service.interface';
import { AUTH_SRV } from './domain/interfaces/auth.service.interface';
import { BCRYPT_SRV } from './domain/interfaces/bcrypt.service.interface';

import { AccessTokenServiceImpl } from './application/services/access-token.service';
import { AuthServiceImpl } from './application/services/auth.service';
import { BcryptServiceImpl } from './application/services/bcrypt.service';
import { IsAuthorizedUseCase } from './application/use-cases/is-authorized.use-case';
import { LoginWithEmailUseCase } from './application/use-cases/login-with-email.use-case';
import { LogoutUseCase } from './application/use-cases/logout.use-case';

import { AuthControllerV1 } from './auth.controller-v1';
import { LocalStrategy } from './application/strategies/local.strategy';

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
