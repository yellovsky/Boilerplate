import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { SkippedOr } from 'src/shared/utils/load-result';
import type { AuthRequestContext } from 'src/shared/utils/request-context';

import type { ShortWorkoutEntity } from '../entites/short-workout.entity';
import type { WorkoutEntity } from '../entites/workout.entity';

export interface WorkoutsAccessService {
  filterCanReadWorkout(authCtx: AuthRequestContext, workoutEntity: WorkoutEntity): Promise<SkippedOr<WorkoutEntity>>;
  filterCanReadShortWorkout(
    authCtx: AuthRequestContext,
    workoutEntity: ShortWorkoutEntity
  ): Promise<SkippedOr<ShortWorkoutEntity>>;
}

export const WORKOUTS_ACCESS_SRV = 'WORKOUTS_ACCESS_SRV' as InjectableIdentifier<WorkoutsAccessService>;
