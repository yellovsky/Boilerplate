import type { Prisma } from '@generated/prisma';

export const dbShortWorkoutSelect = {
  id: true,
  createdAt: true,
  publishedAt: true,
  slug: true,
  updatedAt: true,
  translations: {
    select: {
      createdAt: true,
      languageCode: true,
      name: true,
      publishedAt: true,
      updatedAt: true,
    },
  },
} as const satisfies Prisma.WorkoutSelect;

export type DBShortWorkout = Prisma.WorkoutGetPayload<{ select: typeof dbShortWorkoutSelect }>;

export const dbWorkoutSelect = {
  ...dbShortWorkoutSelect,
  translations: {
    select: {
      ...dbShortWorkoutSelect.translations.select,
      seoDescription: true,
      seoKeywords: true,
      seoTitle: true,
    },
  },
} as const satisfies Prisma.WorkoutSelect;

export type DBWorkout = Prisma.WorkoutGetPayload<{ select: typeof dbWorkoutSelect }>;
