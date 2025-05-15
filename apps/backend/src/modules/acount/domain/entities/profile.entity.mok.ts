import { faker } from '@faker-js/faker';

import { ProfileEntity, type ProfileEntityData } from './profile.entity';

export const createMockProfileEntity = (overrides?: Partial<ProfileEntityData>): ProfileEntity =>
  ProfileEntity.from({
    accountId: faker.string.uuid(),
    createdAt: faker.date.past(),
    id: faker.string.uuid(),
    isRoot: faker.datatype.boolean(),
    name: faker.internet.username(),
    updatedAt: faker.date.past(),
    ...overrides,
  });
