import type { Prisma } from '@generated/prisma';

export const dbAuthProvidersSelect = {
  accountId: true,
  createdAt: true,
  email: true,
  id: true,
  passwordHash: true,
  providerType: true,
  updatedAt: true,
} as const satisfies Prisma.AuthProviderSelect;

export type DBAuthProvider = Prisma.AuthProviderGetPayload<{ select: typeof dbAuthProvidersSelect }>;
