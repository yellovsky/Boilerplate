import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShortWorkoutEntity } from '../entites/short-workout.entity';
import type { WorkoutEntity } from '../entites/workout.entity';

export interface GetWorkoutByIdParams {
  locale: string;
}

export interface GetManyWorkoutsParams {
  locale: string;
  sort: 'createdAt' | '-createdAt';
  page: { limit: number; offset: number };
}

export interface WorkoutsService {
  getWorkoutsTotal(reqCtx: RequestContext, params: GetManyWorkoutsParams): Promise<number>;
  getWorkouts(reqCtx: RequestContext, params: GetManyWorkoutsParams): Promise<ResultOrExcluded<ShortWorkoutEntity>[]>;
  getWorkoutsWithTotal(
    reqCtx: RequestContext,
    params: GetManyWorkoutsParams
  ): Promise<{ items: ResultOrExcluded<ShortWorkoutEntity>[]; total: number }>;

  getWorkoutBySlugOrId(
    reqCtx: RequestContext,
    slugOrId: string,
    params: GetWorkoutByIdParams
  ): Promise<ResultOrExcluded<WorkoutEntity>>;
}

export const WORKOUTS_SRV = 'WORKOUTS_SRV' as InjectableIdentifier<WorkoutsService>;
