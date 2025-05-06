import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/shared/infrastructure/db/schema/index.ts',

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
