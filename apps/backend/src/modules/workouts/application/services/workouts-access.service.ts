import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { type SkippedOr, SkippedReason } from 'src/shared/utils/load-result';
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
  ): Promise<SkippedOr<WorkoutEntity>> {
    const canRead = await this.casbinSrv.checkRequestPermission(authCtx, 'read', 'workout', workoutEntity);
    return canRead ? Either.right(workoutEntity) : Either.left({ reason: SkippedReason.ACCESS_DENIED });
  }

  async filterCanReadShortWorkout(
    authCtx: AuthRequestContext,
    workoutEntity: ShortWorkoutEntity
  ): Promise<SkippedOr<ShortWorkoutEntity>> {
    const canRead = await this.casbinSrv.checkRequestPermission(authCtx, 'read', 'workout', workoutEntity);
    return canRead ? Either.right(workoutEntity) : Either.left({ reason: SkippedReason.ACCESS_DENIED });
  }
}
