import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockAccountEntity } from 'src/modules/acount/domain/entities/account.entity.mock';
import { createMockEmailAuthProviderEntity } from 'src/modules/acount/domain/entities/auth-provider.entity.mock';
import { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { ACCOUNTS_SRV, AUTH_PROVIDERS_SRV } from 'src/modules/acount';

import { AuthInvalidPwdError } from '../../domain/errors/auth-invalid-pwd.error';
import { AuthNotFoundError } from '../../domain/errors/auth-not-found.error';
import { AuthPwdIsNotSetError } from '../../domain/errors/auth-pwd-is-not-set.error';
import { BCRYPT_SRV } from '../../domain/interfaces/bcrypt.service.interface';
import { AUTH_SRV, AuthService } from '../../domain/interfaces/auth.service.interface';

import { AuthServiceImpl } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let authProvidersSrv: DeepMocked<IdentifierOf<typeof AUTH_PROVIDERS_SRV>>;
  let bcryptSrv: DeepMocked<IdentifierOf<typeof BCRYPT_SRV>>;
  let accountSrv: DeepMocked<IdentifierOf<typeof ACCOUNTS_SRV>>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AUTH_SRV, useClass: AuthServiceImpl },
        { provide: BCRYPT_SRV, useValue: createMock<IdentifierOf<typeof BCRYPT_SRV>>() },
        { provide: ACCOUNTS_SRV, useValue: createMock<IdentifierOf<typeof ACCOUNTS_SRV>>() },
        {
          provide: AUTH_PROVIDERS_SRV,
          useValue: createMock<IdentifierOf<typeof AUTH_PROVIDERS_SRV>>(),
        },
      ],
    }).compile();

    service = moduleFixture.get<AuthService>(AUTH_SRV);
    authProvidersSrv = moduleFixture.get(AUTH_PROVIDERS_SRV);
    accountSrv = moduleFixture.get(ACCOUNTS_SRV);
    bcryptSrv = moduleFixture.get(BCRYPT_SRV);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateAccountByEmail', () => {
    describe('when valid email and password passed', () => {
      it('should return accountEntity', async () => {
        const expectedAccountEntity = createMockAccountEntity();

        accountSrv.getAccountById.mockResolvedValue(expectedAccountEntity);

        authProvidersSrv.getAuthProviderByEmail.mockResolvedValue(
          expectedAccountEntity.authProviders.at(0) || null,
        );
        bcryptSrv.compare.mockResolvedValue(true);

        const profileEntity = await service.validateProfileByEmail('email', 'password');
        expect(profileEntity).toBe(expectedAccountEntity.authProviders.at(0));
      });
    });

    describe('when auth provider with email does not exist', () => {
      it('should throw AuthNotFoundError', async () => {
        authProvidersSrv.getAuthProviderByEmail.mockResolvedValue(null);
        const fn = async () => {
          await service.validateProfileByEmail('email', 'password');
        };

        expect(fn()).rejects.toThrow(AuthNotFoundError);
      });
    });

    describe('when auth provider does not have password hash', () => {
      it('should throw AuthPwdIsNotSetError', async () => {
        authProvidersSrv.getAuthProviderByEmail.mockResolvedValue(
          createMockEmailAuthProviderEntity({ passwordHash: null }),
        );

        const fn = async () => {
          await service.validateProfileByEmail('email', 'password');
        };

        expect(fn()).rejects.toThrow(AuthPwdIsNotSetError);
      });
    });

    describe('when password is not valid', () => {
      it('should throw AuthInvalidPwdError', async () => {
        const expectedAccountEntity = createMockAccountEntity();

        accountSrv.getAccountById.mockResolvedValue(expectedAccountEntity);

        authProvidersSrv.getAuthProviderByEmail.mockResolvedValue(
          expectedAccountEntity.authProviders.at(0) || null,
        );
        bcryptSrv.compare.mockResolvedValue(false);

        const fn = async () => {
          await service.validateProfileByEmail('email', 'password');
        };

        expect(fn()).rejects.toThrow(AuthInvalidPwdError);
      });
    });
  });
});
