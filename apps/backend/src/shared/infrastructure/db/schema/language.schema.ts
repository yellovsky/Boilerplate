import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const languages = pgTable('languages', {
  code: varchar('code', { length: 255 }).primaryKey(),
});

export type DBLanguageSelect = typeof languages.$inferSelect;
export type DBLanguageInsert = typeof languages.$inferInsert;
