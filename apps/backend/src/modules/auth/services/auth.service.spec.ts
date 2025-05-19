import { createMock, type DeepMocked } from '@golevelup/ts-vitest';
import { Test, type TestingModule } from '@nestjs/testing';
import { Either } from 'effect';

import { NotFoundReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { makeMockRequestContext } from 'src/shared/utils/request-context';

import { ACCOUNTS_SRV, AUTH_PROVIDERS_SRV, PROFILES_SRV } from 'src/modules/acount';
import { createMockAccountEntity } from 'src/modules/acount/entities/account.entity.mock';
import { createMockEmailAuthProviderEntity } from 'src/modules/acount/entities/auth-provider.entity.mock';

import { AuthInvalidPwdError } from '../errors/auth-invalid-pwd.error';
import { AuthNotFoundError } from '../errors/auth-not-found.error';
import { AuthPwdIsNotSetError } from '../errors/auth-pwd-is-not-set.error';
import { AUTH_SRV, type AuthService } from '../interfaces/auth.service.interface';
import { BCRYPT_SRV } from '../interfaces/bcrypt.service.interface';
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
        { provide: PROFILES_SRV, useValue: createMock<IdentifierOf<typeof PROFILES_SRV>>() },
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

        accountSrv.getAccountRootProfile.mockResolvedValue(Either.right(expectedAccountEntity.profiles[0]));

        authProvidersSrv.getAuthProviderByEmail.mockResolvedValue(Either.right(expectedAccountEntity.authProviders[0]));
        bcryptSrv.compare.mockResolvedValue(true);

        const profileEntity = await service.validateProfileByEmail(makeMockRequestContext(), 'email', 'password');
        await expect(Either.getOrThrow(profileEntity)).toBe(expectedAccountEntity.profiles.at(0));
      });
    });

    describe('when auth provider with email does not exist', () => {
      it('should throw AuthNotFoundError', async () => {
        authProvidersSrv.getAuthProviderByEmail.mockResolvedValue(Either.left(new NotFoundReason()));
        const fn = async () => {
          await service.validateProfileByEmail(makeMockRequestContext(), 'email', 'password');
        };

        await expect(fn()).rejects.toThrow(AuthNotFoundError);
      });
    });

    describe('when auth provider does not have password hash', () => {
      it('should throw AuthPwdIsNotSetError', async () => {
        authProvidersSrv.getAuthProviderByEmail.mockResolvedValue(
          Either.right(createMockEmailAuthProviderEntity({ passwordHash: null }))
        );

        const fn = async () => {
          await service.validateProfileByEmail(makeMockRequestContext(), 'email', 'password');
        };

        await expect(fn()).rejects.toThrow(AuthPwdIsNotSetError);
      });
    });

    describe('when password is not valid', () => {
      it('should throw AuthInvalidPwdError', async () => {
        const expectedAccountEntity = createMockAccountEntity();

        accountSrv.getAccountById.mockResolvedValue(Either.right(expectedAccountEntity));

        authProvidersSrv.getAuthProviderByEmail.mockResolvedValue(Either.right(expectedAccountEntity.authProviders[0]));
        bcryptSrv.compare.mockResolvedValue(false);

        const fn = async () => {
          await service.validateProfileByEmail(makeMockRequestContext(), 'email', 'password');
        };

        await expect(fn()).rejects.toThrow(AuthInvalidPwdError);
      });
    });
  });
});
