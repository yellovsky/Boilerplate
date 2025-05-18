import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';

import type { GetOneWorkoutQuery } from '@repo/api-models';

import { makeDefaultTranslationStrategy } from 'src/shared/config/translation-strategy';
import { flatMapRightAsync } from 'src/shared/utils/flat-map-right-async';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
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
    private readonly accessSrv: IdentifierOf<typeof WORKOUTS_ACCESS_SRV>
  ) {}

  async execute(reqCtx: RequestContext, id: string, query: GetOneWorkoutQuery): Promise<GetOneWorkoutResponseDto> {
    const workoutEither = await this.workoutsSrv.getWorkoutBySlugOrId(reqCtx, id, query);
    const accessChecked = await flatMapRightAsync(workoutEither, (w) => this.accessSrv.filterCanReadWorkout(reqCtx, w));
    const published = Either.flatMap(accessChecked, (w) => w.filterPublished());
    const strategy = makeDefaultTranslationStrategy({ fallbackLocale: reqCtx.locale, locale: query.locale });
    const response = Either.flatMap(published, (w) => GetOneWorkoutResponseDto.fromEntity(strategy, w));
    return Either.getOrThrowWith(response, (err) => err.toFailedResponseDto());
  }
}
