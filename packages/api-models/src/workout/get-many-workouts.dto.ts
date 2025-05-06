import * as zod from 'zod';

import { localeSchema } from '../common/locale';

import {
  getItemsWithPaginationSchema,
  getSuccessResponseSchema,
} from '../common/success-response.dto';

import { workoutSchema } from './workout.dto';

export const getManyWorkoutsQuerySchema = zod.object({
  locale: localeSchema.min(1),
});

export type GetManyWorkoutsQuery = zod.infer<typeof getManyWorkoutsQuerySchema>;

export const getManyWorkoutsResponseSchema = getSuccessResponseSchema(
  getItemsWithPaginationSchema(workoutSchema),
);
export type GetManyWorkoutsResponse = zod.infer<typeof getManyWorkoutsResponseSchema>;
