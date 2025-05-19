import type { INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, type TestingModule } from '@nestjs/testing';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { APP_CONFIG_SRV, AppConfigModule } from 'src/modules/app-config';

import { ACCESS_TOKEN_SRV } from '../interfaces/access-token.service.interface';
import { AccessTokenServiceImpl } from './access-token.service';

describe('AccessTokenService', () => {
  let service: IdentifierOf<typeof ACCESS_TOKEN_SRV>;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, AppConfigModule],
      providers: [{ provide: ACCESS_TOKEN_SRV, useClass: AccessTokenServiceImpl }],
    })
      .overrideProvider(APP_CONFIG_SRV)
      .useValue({ jwtSecret: 'jwtSecret' })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<IdentifierOf<typeof ACCESS_TOKEN_SRV>>(ACCESS_TOKEN_SRV);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate token', async () => {
    const payload = { accountId: 'account-id', profileId: 'profile-id' };
    const token = await service.generate(payload);
    const parsedPayload = await service.parse(token);

    expect(parsedPayload).toEqual(expect.objectContaining(payload));
  });
});
