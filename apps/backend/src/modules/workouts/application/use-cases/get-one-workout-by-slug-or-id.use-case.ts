import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { GetOneWorkoutQuery } from '@repo/api-models';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { unwrapOrThrowSkipped } from 'src/shared/utils/load-result';
import type { RequestContext } from 'src/shared/utils/request-context';

import { WORKOUTS_SRV } from '../../domain/interfaces/workouts.service.interface';
import { WORKOUTS_ACCESS_SRV } from '../../domain/interfaces/workouts-access.service.interface';
import { GetOneWorkoutResponseDto } from '../dto/get-one-workout-response.dto';

@Injectable()
export class GetOneWorkoutBySlugOrIdUseCase {
  constructor(
    @Inject(WORKOUTS_SRV)
    private readonly workoutsSrv: IdentifierOf<typeof WORKOUTS_SRV>,

    @Inject(WORKOUTS_ACCESS_SRV)
    private readonly workoutsAccessSrv: IdentifierOf<typeof WORKOUTS_ACCESS_SRV>
  ) {}

  async execute(reqCtx: RequestContext, id: string, query: GetOneWorkoutQuery): Promise<GetOneWorkoutResponseDto> {
    const workoutEntity = unwrapOrThrowSkipped(await this.workoutsSrv.getWorkoutBySlugOrId(id, query));
    if (!workoutEntity) throw new NotFoundException();

    const checckedAccess = unwrapOrThrowSkipped(
      await this.workoutsAccessSrv.filterCanReadWorkout(reqCtx, workoutEntity)
    );

    const publishedWorkoutEntity = unwrapOrThrowSkipped(checckedAccess.filterPublished());

    const responseDto = GetOneWorkoutResponseDto.fromEntity(
      // TODO: move to constant
      { fallbackFirstDefined: true, fallbackLocale: 'en', locale: query.locale },
      publishedWorkoutEntity
    );

    if (!responseDto) throw new NotFoundException();

    return responseDto;
  }
}
