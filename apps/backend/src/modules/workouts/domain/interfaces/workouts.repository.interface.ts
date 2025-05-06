import { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import { WorkoutEntity } from '../entites/workout.entity';

export interface WorkoutsRepository {
  findOneBySlugOrId(slugOrId: string): Promise<WorkoutEntity | null>;
  createOne(data: { name: string }): Promise<WorkoutEntity>;
}

export const WORKOUTS_REPO = 'WORKOUTS_REPO' as InjectableIdentifier<WorkoutsRepository>;
