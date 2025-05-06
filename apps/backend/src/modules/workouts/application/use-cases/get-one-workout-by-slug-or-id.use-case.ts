import { GetOneWorkoutQuery } from '@repo/api-models';
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import {
  WORKOUTS_ACCESS_SRV,
  WORKOUTS_SRV,
} from '../../domain/interfaces/workouts.service.interface';

import { GetOneWorkoutResponseDto } from '../dto/get-one-workout-response.dto';

@Injectable()
export class GetOneWorkoutBySlugOrIdUseCase {
  constructor(
    @Inject(WORKOUTS_SRV)
    private readonly workoutsSrv: IdentifierOf<typeof WORKOUTS_SRV>,

    @Inject(WORKOUTS_ACCESS_SRV)
    private readonly workoutsAccessSrv: IdentifierOf<typeof WORKOUTS_ACCESS_SRV>,
  ) {}

  async execute(id: string, query: GetOneWorkoutQuery): Promise<GetOneWorkoutResponseDto> {
    const workoutEntity = await this.workoutsSrv.getWorkoutBySlugOrId(id, query);
    if (!workoutEntity) throw new NotFoundException();

    if (!this.workoutsAccessSrv.canRead(workoutEntity)) throw new ForbiddenException();

    const publishedWorkoutEntity = workoutEntity.filterPublished();
    if (!publishedWorkoutEntity) throw new NotFoundException();

    const responseDto = GetOneWorkoutResponseDto.fromEntity(
      // TODO: move to constant
      { fallbackFirstDefined: true, fallbackLocale: 'en', locale: query.locale },
      publishedWorkoutEntity,
    );

    if (!responseDto) throw new NotFoundException();

    return responseDto;
  }
}
