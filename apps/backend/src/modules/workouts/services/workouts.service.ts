import { Inject, Injectable } from '@nestjs/common';

import type { ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShortWorkoutEntity } from '../entites/short-workout.entity';
import type { WorkoutEntity } from '../entites/workout.entity';
import { WORKOUTS_REPO } from '../interfaces/workouts.repository.interface';
import type {
  GetManyWorkoutsParams,
  GetWorkoutByIdParams,
  WorkoutsService,
} from '../interfaces/workouts.service.interface';

@Injectable()
export class WorkoutsServiceImpl implements WorkoutsService {
  constructor(
    @Inject(WORKOUTS_REPO)
    private readonly workoutsRepo: IdentifierOf<typeof WORKOUTS_REPO>
  ) {}

  async getWorkoutBySlugOrId(
    reqCtx: RequestContext,
    slugOrId: string,
    _params: GetWorkoutByIdParams
  ): Promise<ResultOrExcluded<WorkoutEntity>> {
    return this.workoutsRepo.findOneBySlugOrId(reqCtx, slugOrId);
  }

  getWorkouts(reqCtx: RequestContext, params: GetManyWorkoutsParams): Promise<ResultOrExcluded<ShortWorkoutEntity>[]> {
    return this.workoutsRepo.findManyWorkouts(reqCtx, {
      orderBy: params.sort,
      skip: params.page.offset,
      take: params.page.limit,
    });
  }

  getWorkoutsTotal(reqCtx: RequestContext, params: GetManyWorkoutsParams): Promise<number> {
    return this.workoutsRepo.findManyWorkoutsTotal(reqCtx, {
      orderBy: params.sort,
      skip: params.page.offset,
      take: params.page.limit,
    });
  }

  async getWorkoutsWithTotal(
    reqCtx: RequestContext,
    params: GetManyWorkoutsParams
  ): Promise<{ items: ResultOrExcluded<ShortWorkoutEntity>[]; total: number }> {
    const [items, total] = await Promise.all([this.getWorkouts(reqCtx, params), this.getWorkoutsTotal(reqCtx, params)]);
    return { items, total };
  }
}
