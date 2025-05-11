import type { PrismaClient } from '@generated/prisma';

export const languagesSeeder = {
  clear: (tx: PrismaClient) => tx.language.deleteMany(),
  seed: async (tx: PrismaClient) => {
    await tx.language.createMany({ data: [{ code: 'en' }, { code: 'ru' }] });
  },
};
