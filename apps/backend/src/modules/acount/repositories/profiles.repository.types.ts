import type { Prisma } from '@generated/prisma';

export const dbProfileSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  accountId: true,
  isRoot: true,
  name: true,
} as const satisfies Prisma.ProfileSelect;

export type DBProfile = Prisma.ProfileGetPayload<{ select: typeof dbProfileSelect }>;
