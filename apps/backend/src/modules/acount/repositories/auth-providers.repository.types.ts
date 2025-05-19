import type { Prisma } from '@generated/prisma';

export const dbAuthProvidersSelect = {
  id: true,
  accountId: true,
  createdAt: true,
  email: true,
  passwordHash: true,
  updatedAt: true,
  providerType: true,
} as const satisfies Prisma.AuthProviderSelect;

export type DBAuthProvider = Prisma.AuthProviderGetPayload<{ select: typeof dbAuthProvidersSelect }>;
