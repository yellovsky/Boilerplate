import { Inject, Injectable } from '@nestjs/common';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { SkippedOr } from 'src/shared/utils/load-result';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShortWorkoutEntity } from '../../domain/entites/short-workout.entity';
import type { WorkoutEntity } from '../../domain/entites/workout.entity';
import { WORKOUTS_REPO } from '../../domain/interfaces/workouts.repository.interface';
import type {
  GetManyWorkoutsParams,
  GetWorkoutByIdParams,
  WorkoutsService,
} from '../../domain/interfaces/workouts.service.interface';

@Injectable()
export class WorkoutsServiceImpl implements WorkoutsService {
  constructor(
    @Inject(WORKOUTS_REPO)
    private readonly workoutsRepo: IdentifierOf<typeof WORKOUTS_REPO>
  ) {}

  async getWorkoutBySlugOrId(slugOrId: string, _params: GetWorkoutByIdParams): Promise<SkippedOr<WorkoutEntity>> {
    return this.workoutsRepo.findOneBySlugOrId(slugOrId);
  }

  getWorkouts(reqCtx: RequestContext, params: GetManyWorkoutsParams): Promise<SkippedOr<ShortWorkoutEntity>[]> {
    return this.workoutsRepo.findManyWorkouts(reqCtx, {
      skip: params.page.offset,
      take: params.page.limit,
      orderBy: params.sort,
    });
  }

  getWorkoutsTotal(reqCtx: RequestContext, params: GetManyWorkoutsParams): Promise<number> {
    return this.workoutsRepo.findManyWorkoutsTotal(reqCtx, {
      skip: params.page.offset,
      take: params.page.limit,
      orderBy: params.sort,
    });
  }

  async getWorkoutsWithTotal(
    reqCtx: RequestContext,
    params: GetManyWorkoutsParams
  ): Promise<{ items: SkippedOr<ShortWorkoutEntity>[]; total: number }> {
    const [items, total] = await Promise.all([this.getWorkouts(reqCtx, params), this.getWorkoutsTotal(reqCtx, params)]);
    return { items, total };
  }
}
