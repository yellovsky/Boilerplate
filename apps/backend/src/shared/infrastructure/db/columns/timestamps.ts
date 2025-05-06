import { timestamp } from 'drizzle-orm/pg-core';

export const timestampColumns = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
};
