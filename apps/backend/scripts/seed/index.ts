import { PrismaClient } from '@generated/prisma';

import { seedWorkouts } from './workouts.seed';

const main = async () => {
  const prisma = new PrismaClient();

  try {
    await seedWorkouts(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
