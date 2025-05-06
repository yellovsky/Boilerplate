import { timestamp } from 'drizzle-orm/pg-core';

export const publishingColumns = {
  publishedAt: timestamp('published_at'),
};
