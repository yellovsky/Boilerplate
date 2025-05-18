import { ApiProperty } from '@nestjs/swagger';
import { Either } from 'effect/index';

import type { GetManyWorkoutsResponse, ResponsePagination } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/application/dto/list-response-pagination.dto';
import type { JSONLike } from 'src/shared/utils/json-like';
import type { GetTranslationsStrategy } from 'src/shared/utils/translation-strategy';

import type { ShortWorkoutEntity } from '../../domain/entites/short-workout.entity';
import { ShortWorkoutDto } from './short-workout.dto';

interface ManyWorkoutsDataInput {
  items: Array<ShortWorkoutEntity | ShortWorkoutDto>;
  pagination: ResponsePagination | ListResponsePaginationDto;
}

class ManyWorkoutsResponseDataDto {
  @ApiProperty({ description: 'Workouts', type: [ShortWorkoutDto] })
  items: ShortWorkoutDto[];

  @ApiProperty({ description: 'List response items pagination', type: ListResponsePaginationDto })
  pagination: ListResponsePaginationDto;

  constructor(items: ShortWorkoutDto[], pagination: ListResponsePaginationDto) {
    this.items = items;
    this.pagination = pagination;
  }

  static from(strategy: GetTranslationsStrategy, input: ManyWorkoutsDataInput): ManyWorkoutsResponseDataDto {
    const items: ShortWorkoutDto[] = input.items
      .map((item) =>
        item instanceof ShortWorkoutDto ? item : Either.getOrNull(ShortWorkoutDto.fromEntity(strategy, item))
      )
      .filter((i): i is ShortWorkoutDto => Boolean(i));

    const pagination =
      input.pagination instanceof ListResponsePaginationDto
        ? input.pagination
        : ListResponsePaginationDto.from(input.pagination);

    return new ManyWorkoutsResponseDataDto(items, pagination);
  }
}

export class GetManyWorkoutsResponseDto implements JSONLike<GetManyWorkoutsResponse> {
  @ApiProperty({ enum: ['success'], type: String })
  status: 'success' = 'success' as const;

  @ApiProperty({ type: ManyWorkoutsResponseDataDto })
  data: ManyWorkoutsResponseDataDto;

  constructor(data: ManyWorkoutsResponseDataDto) {
    this.data = data;
  }

  static from(strategy: GetTranslationsStrategy, input: ManyWorkoutsDataInput): GetManyWorkoutsResponseDto {
    return new GetManyWorkoutsResponseDto(ManyWorkoutsResponseDataDto.from(strategy, input));
  }
}
