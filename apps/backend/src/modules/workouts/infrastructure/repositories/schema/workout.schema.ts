import { relations } from 'drizzle-orm';
import { pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core';

import { languages } from 'src/shared/infrastructure/db/schema/language.schema';
import { publishingColumns } from 'src/shared/infrastructure/db/columns/publishing';
import { seoColumns } from 'src/shared/infrastructure/db/columns/seo';
import { timestampColumns } from 'src/shared/infrastructure/db/columns/timestamps';

/**
 * Translations
 */
export const workoutTranslations = pgTable(
  'workout_translations',
  {
    languageCode: varchar('language_code')
      .references(() => languages.code, { onDelete: 'restrict' })
      .notNull(),

    workoutId: uuid('workout_id')
      .notNull()
      .references(() => workouts.id, { onDelete: 'cascade' })
      .notNull(),

    name: varchar('name', { length: 255 }).notNull(),

    ...timestampColumns,
    ...publishingColumns,
    ...seoColumns,
  },
  t => [unique('workout_by_locale_translation').on(t.workoutId, t.languageCode)],
);

export type DBWorkoutTranslationsSelect = typeof workoutTranslations.$inferSelect;
export type DBWorkoutTranslationsInsert = typeof workoutTranslations.$inferInsert;

/**
 * Workouts
 */
export const workouts = pgTable('workouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug').unique().notNull(),

  ...timestampColumns,
  ...publishingColumns,
});

export const workoutRelations = relations(workouts, ({ many }) => ({
  translations: many(workoutTranslations),
}));

export type DBWorkoutSelect = typeof workouts.$inferSelect;
export type DBWorkoutInsert = typeof workouts.$inferInsert;

export const workoutTranslationsRelations = relations(workoutTranslations, ({ one }) => ({
  workout: one(workouts, {
    fields: [workoutTranslations.workoutId],
    references: [workouts.id],
  }),
}));
