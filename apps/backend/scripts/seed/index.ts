import { PrismaClient } from '@generated/prisma';
import * as R from 'ramda';

import { accountsSeeder } from './account.seed';
import { cabinRulesSeeder } from './casbin-rule.seed';
import { languagesSeeder } from './languages.seed';
import { workoutsSeeder } from './workouts.seed';

const seeders = [languagesSeeder, cabinRulesSeeder, accountsSeeder, workoutsSeeder];

const main = async () => {
  const prisma = new PrismaClient();

  try {
    for (const seeder of R.reverse(seeders)) {
      await seeder.clear(prisma);
    }

    for (const seeder of seeders) {
      await seeder.seed(prisma);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
