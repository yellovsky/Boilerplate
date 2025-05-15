import { faker } from '@faker-js/faker';

import { EmailAuthProviderEntity, type EmailAuthProviderEntityData } from './auth-provider.entity';

export const createMockEmailAuthProviderEntity = (
  overrides?: Partial<EmailAuthProviderEntityData>
): EmailAuthProviderEntity =>
  EmailAuthProviderEntity.from({
    accountId: faker.string.uuid(),
    createdAt: faker.date.past(),
    email: faker.internet.email(),
    id: faker.string.uuid(),
    passwordHash: faker.internet.password(),
    providerType: 'email',
    updatedAt: faker.date.past(),
    ...overrides,
  });
