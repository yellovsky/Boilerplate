import { Inject, Injectable } from '@nestjs/common';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import type { WorkoutEntity } from '../../domain/entites/workout.entity';
import { WORKOUTS_REPO } from '../../domain/interfaces/workouts.repository.interface';
import type { GetWorkoutByIdParams, WorkoutsService } from '../../domain/interfaces/workouts.service.interface';

@Injectable()
export class WorkoutsServiceImpl implements WorkoutsService {
  constructor(
    @Inject(WORKOUTS_REPO)
    private readonly workoutsRepo: IdentifierOf<typeof WORKOUTS_REPO>
  ) {}

  async getWorkoutBySlugOrId(slugOrId: string, _params: GetWorkoutByIdParams): Promise<WorkoutEntity | null> {
    return this.workoutsRepo.findOneBySlugOrId(slugOrId);
  }
}
