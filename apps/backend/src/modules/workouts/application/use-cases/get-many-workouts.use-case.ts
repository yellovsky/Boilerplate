import { Inject, Injectable } from '@nestjs/common';
import * as Either from 'effect/Either';

import type { GetManyWorkoutsQuery } from '@repo/api-models';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { WORKOUTS_SRV } from '../../domain/interfaces/workouts.service.interface';
import { WORKOUTS_ACCESS_SRV } from '../../domain/interfaces/workouts-access.service.interface';
import { GetManyWorkoutsResponseDto } from '../dto/get-many-workouts-response.dto';

@Injectable()
export class GetManyWorkoutsUseCase {
  constructor(
    @Inject(WORKOUTS_SRV)
    private readonly workoutsSrv: IdentifierOf<typeof WORKOUTS_SRV>,

    @Inject(WORKOUTS_ACCESS_SRV)
    private readonly workoutsAccessSrv: IdentifierOf<typeof WORKOUTS_ACCESS_SRV>
  ) {}

  async execute(reqCtx: RequestContext, query: GetManyWorkoutsQuery): Promise<GetManyWorkoutsResponseDto> {
    const { items, total } = await this.workoutsSrv.getWorkoutsWithTotal(reqCtx, query);

    const accessChecked = await Promise.all(
      items.map((loaded) =>
        Either.isRight(loaded) ? this.workoutsAccessSrv.filterCanReadShortWorkout(reqCtx, loaded.right) : loaded
      )
    );

    return GetManyWorkoutsResponseDto.from(
      { locale: query.locale, fallbackFirstDefined: true, fallbackLocale: 'en' },
      {
        items: accessChecked.filter(Either.isRight).map((i) => i.right),

        pagination: {
          limit: query.page.limit,
          offset: query.page.offset,
          skipped: accessChecked.map((val, index) => (Either.isLeft(val) ? index : null)).filter((val) => val !== null),
          total: total,
        },
      }
    );
  }
}
