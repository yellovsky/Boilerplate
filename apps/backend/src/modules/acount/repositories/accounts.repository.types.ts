import type { Prisma } from '@generated/prisma';

import { dbProfileSelect } from './profiles.repository.types';

export const dbAccountSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  profiles: { select: dbProfileSelect },

  authProviders: {
    select: {
      createdAt: true,
      email: true,
      passwordHash: true,
      providerType: true,
      id: true,
      providerUserId: true,
      updatedAt: true,
      accountId: true,
    },
  },
} as const satisfies Prisma.AccountSelect;

export type DBAccount = Prisma.AccountGetPayload<{ select: typeof dbAccountSelect }>;
