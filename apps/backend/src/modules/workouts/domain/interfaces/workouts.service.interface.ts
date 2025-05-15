import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { WorkoutEntity } from '../entites/workout.entity';

export interface GetWorkoutByIdParams {
  locale: string;
}

export interface WorkoutsService {
  getWorkoutBySlugOrId(slugOrId: string, params: GetWorkoutByIdParams): Promise<WorkoutEntity | null>;
}

export const WORKOUTS_SRV = 'WORKOUTS_SRV' as InjectableIdentifier<WorkoutsService>;

export interface WorkoutsAccessService {
  canRead(workoutEntity: WorkoutEntity): boolean;
}

export const WORKOUTS_ACCESS_SRV = 'WORKOUTS_ACCESS_SRV' as InjectableIdentifier<WorkoutsAccessService>;
