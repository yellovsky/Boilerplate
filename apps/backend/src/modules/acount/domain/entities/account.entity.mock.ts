import { faker } from '@faker-js/faker';

import { createMockEmailAuthProviderEntity } from './auth-provider.entity.mock';
import { createMockProfileEntity } from './profile.entity.mok';
import { AccountEntity, AccountEntityData } from './account.entity';

export const createMockAccountEntity = (overrides?: Partial<AccountEntityData>): AccountEntity => {
  const accountId = overrides?.id || faker.string.uuid();

  return AccountEntity.from({
    authProviders: [createMockEmailAuthProviderEntity({ accountId })],
    createdAt: faker.date.past(),
    id: accountId,
    profiles: [createMockProfileEntity({ accountId, isRoot: true })],
    updatedAt: faker.date.past(),
    ...overrides,
  });
};
