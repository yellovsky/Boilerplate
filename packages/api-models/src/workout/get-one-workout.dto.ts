import * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response.dto';
import { localeSchema } from '../common/locale';

import { workoutSchema } from './workout.dto';

export const getOneWorkoutQuerySchema = zod.object({
  locale: localeSchema.min(1),
});
export type GetOneWorkoutQuery = zod.infer<typeof getOneWorkoutQuerySchema>;

export const getOneWorkoutResponseSchema = getSuccessResponseSchema(workoutSchema);
export type GetOneWorkoutResponse = zod.infer<typeof getOneWorkoutResponseSchema>;
