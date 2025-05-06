import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

export type DB = NodePgDatabase<typeof schema>;
