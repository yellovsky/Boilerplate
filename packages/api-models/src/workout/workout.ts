import type * as zod from 'zod';

import { seoSchema } from '../common/seo';
import { shortWorkoutSchema } from './short-workout';

export const workoutSchema = shortWorkoutSchema.extend({
  seo: seoSchema,
});
export type Workout = zod.infer<typeof workoutSchema>;
