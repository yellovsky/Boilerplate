import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';

import { AccessDeniedReason, type ResultOrExcluded } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { AuthRequestContext } from 'src/shared/utils/request-context';

import { CASBIN_SRV } from 'src/modules/casbin';

import type { ShortWorkoutEntity } from '../../domain/entites/short-workout.entity';
import type { WorkoutEntity } from '../../domain/entites/workout.entity';
import type { WorkoutsAccessService } from '../../domain/interfaces/workouts-access.service.interface';

@Injectable()
export class WorkoutsAccessServiceImpl implements WorkoutsAccessService {
  constructor(
    @Inject(CASBIN_SRV)
    private readonly casbinSrv: IdentifierOf<typeof CASBIN_SRV>
  ) {}

  async filterCanReadWorkout(
    authCtx: AuthRequestContext,
    workoutEntity: WorkoutEntity
  ): Promise<ResultOrExcluded<WorkoutEntity>> {
    const canRead = await this.casbinSrv.checkRequestPermission(authCtx, 'read', 'workout', workoutEntity);
    return canRead ? Either.right(workoutEntity) : Either.left(new AccessDeniedReason());
  }

  async filterCanReadShortWorkout(
    authCtx: AuthRequestContext,
    workoutEntity: ShortWorkoutEntity
  ): Promise<ResultOrExcluded<ShortWorkoutEntity>> {
    const canRead = await this.casbinSrv.checkRequestPermission(authCtx, 'read', 'workout', workoutEntity);
    return canRead ? Either.right(workoutEntity) : Either.left(new AccessDeniedReason());
  }

  filterCanReadShortWorkoutsList(
    authCtx: AuthRequestContext,
    entities: ShortWorkoutEntity[]
  ): Promise<ResultOrExcluded<ShortWorkoutEntity>[]> {
    return Promise.all(entities.map((entity) => this.filterCanReadShortWorkout(authCtx, entity)));
  }
}
