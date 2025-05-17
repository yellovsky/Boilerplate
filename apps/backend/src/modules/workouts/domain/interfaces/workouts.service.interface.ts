import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { SkippedOr } from 'src/shared/utils/load-result';
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
  getWorkouts(reqCtx: RequestContext, params: GetManyWorkoutsParams): Promise<SkippedOr<ShortWorkoutEntity>[]>;
  getWorkoutsTotal(reqCtx: RequestContext, params: GetManyWorkoutsParams): Promise<number>;
  getWorkoutsWithTotal(
    reqCtx: RequestContext,
    params: GetManyWorkoutsParams
  ): Promise<{ items: SkippedOr<ShortWorkoutEntity>[]; total: number }>;

  getWorkoutBySlugOrId(slugOrId: string, params: GetWorkoutByIdParams): Promise<SkippedOr<WorkoutEntity>>;
}

export const WORKOUTS_SRV = 'WORKOUTS_SRV' as InjectableIdentifier<WorkoutsService>;
