import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@generated/prisma';

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

export const seedAccounts = async (tx: PrismaClient) => {
  await tx.account.deleteMany();
  await seedTestUser(tx);
};
