import type { Prisma } from '@generated/prisma';

import { dbProfileSelect } from './profiles.repository.types';

export const dbAccountSelect = {
  authProviders: {
    select: {
      accountId: true,
      createdAt: true,
      email: true,
      id: true,
      passwordHash: true,
      providerType: true,
      providerUserId: true,
      updatedAt: true,
    },
  },
  createdAt: true,
  id: true,
  profiles: { select: dbProfileSelect },
  updatedAt: true,
} as const satisfies Prisma.AccountSelect;

export type DBAccount = Prisma.AccountGetPayload<{ select: typeof dbAccountSelect }>;
