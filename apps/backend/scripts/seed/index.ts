import { PrismaClient } from '@generated/prisma';

import { seedAccounts } from './account.seed';
import { seedLanguages } from './languages.seed';
import { seedWorkouts } from './workouts.seed';

const main = async () => {
  const prisma = new PrismaClient();

  try {
    await seedLanguages(prisma);
    await seedWorkouts(prisma);
    await seedAccounts(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
