import type { PrismaClient } from '@generated/prisma';
import * as bcrypt from 'bcrypt';

const ROUNDS_OF_HASHING = 10;

const seedTestUser = async (tx: PrismaClient) =>
  tx.account.create({
    data: {
      authProviders: {
        createMany: {
          data: [
            {
              email: 'test@email.com',
              passwordHash: await bcrypt.hash('password', ROUNDS_OF_HASHING),
              providerType: 'EMAIL',
            },
          ],
        },
      },
      profiles: { createMany: { data: [{ isRoot: true, name: 'Test' }] } },
    },
  });

export const accountsSeeder = {
  clear: (tx: PrismaClient) => tx.account.deleteMany(),

  seed: async (tx: PrismaClient) => {
    await seedTestUser(tx);
  },
};
