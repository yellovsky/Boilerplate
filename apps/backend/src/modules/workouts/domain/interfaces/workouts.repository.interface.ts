import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { SkippedOr } from 'src/shared/utils/load-result';
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
  // TODO return Load result
  findOneBySlugOrId(slugOrId: string): Promise<SkippedOr<WorkoutEntity>>;
  createOne(data: { name: string }): Promise<WorkoutEntity>;
  findManyWorkouts(txCtx: TxRequestContext, params: FindManyWorkoutsParams): Promise<SkippedOr<ShortWorkoutEntity>[]>;
  findManyWorkoutsTotal(txCtx: TxRequestContext, params: FindManyWorkoutsParams): Promise<number>;
}

export const WORKOUTS_REPO = 'WORKOUTS_REPO' as InjectableIdentifier<WorkoutsRepository>;
