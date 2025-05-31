import type { ShortWorkout } from '@repo/api-models';

export const getWorkoutLink = (workout: ShortWorkout): string => `/workouts/${workout.slug}`;
