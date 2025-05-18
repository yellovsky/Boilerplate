import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';

import type { GetManyWorkoutsQuery } from '@repo/api-models';

import { makeDefaultTranslationStrategy } from 'src/shared/config/translation-strategy';
import type { ResultOrExcluded } from 'src/shared/excluded';
import { applyPromiseToRights } from 'src/shared/utils/apply-promice-to-rights';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ShortWorkoutEntity } from '../../domain/entites/short-workout.entity';
import { WORKOUTS_SRV } from '../../domain/interfaces/workouts.service.interface';
import { WORKOUTS_ACCESS_SRV } from '../../domain/interfaces/workouts-access.service.interface';
import { GetManyWorkoutsResponseDto } from '../dto/get-many-workouts-response.dto';

@Injectable()
export class GetManyWorkoutsUseCase {
  constructor(
    @Inject(WORKOUTS_SRV)
    private readonly workoutsSrv: IdentifierOf<typeof WORKOUTS_SRV>,

    @Inject(WORKOUTS_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof WORKOUTS_ACCESS_SRV>
  ) {}

  async execute(reqCtx: RequestContext, query: GetManyWorkoutsQuery): Promise<GetManyWorkoutsResponseDto> {
    const { items, total } = await this.workoutsSrv.getWorkoutsWithTotal(reqCtx, query);
    const checkedAccess = await applyPromiseToRights(items, (i) =>
      this.accessSrv.filterCanReadShortWorkoutsList(reqCtx, i)
    );

    const published = checkedAccess.map(Either.flatMap((i) => i.filterPublished()));

    return this.#makeResponse(reqCtx, published, total, query);
  }

  #makeResponse(
    reqCtx: RequestContext,
    items: ResultOrExcluded<ShortWorkoutEntity>[],
    total: number,
    query: GetManyWorkoutsQuery
  ): GetManyWorkoutsResponseDto {
    const strategy = makeDefaultTranslationStrategy({ fallbackLocale: reqCtx.locale, locale: query.locale });

    const visibleWorkouts = items.filter(Either.isRight).map((w) => w.right);
    const skippedIndexes = items.flatMap((res, i) => (Either.isLeft(res) ? [i] : []));

    return GetManyWorkoutsResponseDto.from(strategy, {
      items: visibleWorkouts,
      pagination: {
        limit: query.page.limit,
        offset: query.page.offset,
        skipped: skippedIndexes,
        total,
      },
    });
  }
}
