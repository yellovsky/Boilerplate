import { PrismaClient } from '@generated/prisma';

const seedTestWorkout = async (tx: PrismaClient) =>
  tx.workout.create({
    data: {
      publishedAt: new Date(),
      slug: 'test',
      translations: {
        createMany: {
          data: [
            {
              languageCode: 'en',
              name: 'Test tile [en]',
              publishedAt: new Date(),
              seoDescription: 'tst seo_description [en]',
              seoKeywords: 'tst seo_keywords [en]',
              seoTitle: 'tst seo_title [en]',
            },
            {
              languageCode: 'ru',
              name: 'Test tile [ru]',
              seoDescription: 'tst seo_description [ru]',
              seoKeywords: 'tst seo_keywords [ru]',
              seoTitle: 'tst seo_title [ru]',
            },
          ],
        },
      },
    },
  });

export const seedWorkouts = async (tx: PrismaClient) => {
  await tx.workout.deleteMany();
  await seedTestWorkout(tx);
};
