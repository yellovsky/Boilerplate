import { DB } from '../../src/shared/infrastructure/db/drizzle-client';

import {
  DBWorkoutInsert,
  DBWorkoutTranslationsInsert,
  workouts,
  workoutTranslations,
} from '../../src/shared/infrastructure/db/schema';

export const seedWorkouts = async (tx: DB): Promise<Array<{ id: string }>> => {
  const workout: DBWorkoutInsert = {
    publishedAt: new Date(),
    slug: 'test',
  };

  const [{ id }] = await tx.insert(workouts).values(workout).returning().execute();

  const translations: DBWorkoutTranslationsInsert[] = [
    {
      languageCode: 'en',
      name: 'Test tile [en]',
      publishedAt: new Date(),
      seoDescription: 'tst seo_description [en]',
      seoKeywords: 'tst seo_keywords [en]',
      seoTitle: 'tst seo_title [en]',
      workoutId: id,
    },

    {
      languageCode: 'ru',
      name: 'Test tile [ru]',
      seoDescription: 'tst seo_description [ru]',
      seoKeywords: 'tst seo_keywords [ru]',
      seoTitle: 'tst seo_title [ru]',
      workoutId: id,
    },
  ];

  await tx.insert(workoutTranslations).values(translations).execute();

  return [{ id }];
};
