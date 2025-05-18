import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { AuthRequestContext } from 'src/shared/utils/request-context';

import type { ShortWorkoutEntity } from '../entites/short-workout.entity';
import type { WorkoutEntity } from '../entites/workout.entity';

export interface WorkoutsAccessService {
  filterCanReadWorkout(authCtx: AuthRequestContext, entity: WorkoutEntity): Promise<ResultOrExcluded<WorkoutEntity>>;

  filterCanReadShortWorkout(
    authCtx: AuthRequestContext,
    entity: ShortWorkoutEntity
  ): Promise<ResultOrExcluded<ShortWorkoutEntity>>;

  filterCanReadShortWorkoutsList(
    authCtx: AuthRequestContext,
    entities: ShortWorkoutEntity[]
  ): Promise<ResultOrExcluded<ShortWorkoutEntity>[]>;
}

export const WORKOUTS_ACCESS_SRV = 'WORKOUTS_ACCESS_SRV' as InjectableIdentifier<WorkoutsAccessService>;
