import type { Prisma } from '@generated/prisma';

export const dbProfileSelect = {
  accountId: true,
  createdAt: true,
  id: true,
  isRoot: true,
  name: true,
  updatedAt: true,
} as const satisfies Prisma.ProfileSelect;

export type DBProfile = Prisma.ProfileGetPayload<{ select: typeof dbProfileSelect }>;
