import { Injectable } from '@nestjs/common';

import { WorkoutEntity } from '../../domain/entites/workout.entity';
import type { WorkoutsAccessService } from '../../domain/interfaces/workouts.service.interface';

@Injectable()
export class WorkoutsAccessServiceImpl implements WorkoutsAccessService {
  canRead(_workoutEntity: WorkoutEntity): boolean {
    // TODO: implement
    return true;
  }
}
