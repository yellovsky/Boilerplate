import { text, varchar } from 'drizzle-orm/pg-core';

export const seoColumns = {
  seoDescription: text('seo_description').notNull(),
  seoKeywords: text('seo_keywords').notNull(),
  seoTitle: varchar('seo_title', { length: 256 }).notNull(),
};
