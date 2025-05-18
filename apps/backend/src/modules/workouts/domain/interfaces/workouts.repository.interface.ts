import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { ShortWorkoutEntity } from '../entites/short-workout.entity';
import type { WorkoutEntity } from '../entites/workout.entity';

export interface FindManyWorkoutsParams {
  take: number;
  skip: number;
  // TODO Make generic type for orderBy
  orderBy: 'createdAt' | '-createdAt';
}

export interface WorkoutsRepository {
  findOneBySlugOrId(txCtx: TxRequestContext, slugOrId: string): Promise<ResultOrExcluded<WorkoutEntity>>;

  findManyWorkoutsTotal(txCtx: TxRequestContext, params: FindManyWorkoutsParams): Promise<number>;
  findManyWorkouts(
    txCtx: TxRequestContext,
    params: FindManyWorkoutsParams
  ): Promise<ResultOrExcluded<ShortWorkoutEntity>[]>;

  createOne(data: { name: string }): Promise<WorkoutEntity>;
}

export const WORKOUTS_REPO = 'WORKOUTS_REPO' as InjectableIdentifier<WorkoutsRepository>;
