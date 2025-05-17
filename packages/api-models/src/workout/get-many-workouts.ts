import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { pageRequestSchema } from '../common/page-request';
import { getItemsWithPaginationSchema, getSuccessResponseSchema } from '../common/success-response';
import { shortWorkoutSchema } from './short-workout';

export const getManyWorkoutsQuerySchema = zod.object({
  locale: localeSchema.min(1),
  page: pageRequestSchema,
  sort: zod.union([zod.literal('createdAt'), zod.literal('-createdAt')]),
});
export type GetManyWorkoutsQuery = zod.infer<typeof getManyWorkoutsQuerySchema>;

export const getManyWorkoutsResponseSchema = getSuccessResponseSchema(getItemsWithPaginationSchema(shortWorkoutSchema));
export type GetManyWorkoutsResponse = zod.infer<typeof getManyWorkoutsResponseSchema>;
