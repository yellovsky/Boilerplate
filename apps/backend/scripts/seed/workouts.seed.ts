import { faker } from '@faker-js/faker';
import type { PrismaClient } from '@generated/prisma';
import * as R from 'ramda';

const seedFakeWorkout = (tx: PrismaClient) =>
  tx.workout.create({
    data: {
      createdAt: faker.date.past(),
      publishedAt: faker.date.past(),
      slug: faker.lorem.word(),
      translations: {
        createMany: {
          data: [
            {
              createdAt: faker.date.past(),
              languageCode: 'en',
              name: `${faker.lorem.word()} - [en]`,
              publishedAt: faker.date.past(),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              updatedAt: faker.date.past(),
            },
            {
              createdAt: faker.date.past(),
              languageCode: 'ru',
              name: `${faker.lorem.word()} - [ru]`,
              publishedAt: faker.date.past(),
              seoDescription: faker.lorem.sentence(),
              seoKeywords: faker.lorem.words().split(' ').join(', '),
              updatedAt: faker.date.past(),
            },
          ],
        },
      },
      updatedAt: faker.date.past(),
    },
  });

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

const seedTest2Workout = async (tx: PrismaClient) =>
  tx.workout.create({
    data: {
      publishedAt: new Date(),
      slug: 'test-2',
      translations: {
        createMany: {
          data: [
            {
              languageCode: 'en',
              name: 'Test 2 tile [en]',
              publishedAt: new Date(),
              seoDescription: 'tst 2 seo_description [en]',
              seoKeywords: 'tst 2 seo_keywords [en]',
              seoTitle: 'tst 2 seo_title [en]',
            },
            {
              languageCode: 'ru',
              name: 'Test 2 tile [ru]',
              seoDescription: 'tst 2 seo_description [ru]',
              seoKeywords: 'tst 2 seo_keywords [ru]',
              seoTitle: 'tst 2 seo_title [ru]',
            },
          ],
        },
      },
    },
  });

export const workoutsSeeder = {
  clear: (tx: PrismaClient) => tx.workout.deleteMany(),
  seed: async (tx: PrismaClient) => {
    await Promise.all(R.times(() => seedFakeWorkout(tx), 50));

    await seedTestWorkout(tx);
    await seedTest2Workout(tx);
  },
};
