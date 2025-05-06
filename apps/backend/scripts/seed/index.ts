import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { reset } from 'drizzle-seed';

import * as schema from 'src/shared/infrastructure/db/schema';

import { seedLanguages } from './languages.seed';
import { seedWorkouts } from './workouts.seed';

const main = async () => {
  const db = drizzle(process.env.DATABASE_URL!, { logger: true, schema });

  await reset(db, schema);
  await seedLanguages(db);
  await seedWorkouts(db);
};

main();
