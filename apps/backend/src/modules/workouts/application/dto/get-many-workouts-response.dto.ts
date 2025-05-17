import { ApiProperty } from '@nestjs/swagger';

import type { GetManyWorkoutsResponse, ResponsePagination } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/application/dto/list-response-pagination.dto';
import type { JSONLike } from 'src/shared/utils/json-like';
import type { GetTranslationsStrategy } from 'src/shared/utils/translation-strategy';

import type { ShortWorkoutEntity } from '../../domain/entites/short-workout.entity';
import { ShortWorkoutDto } from './short-workout.dto';

interface ManyWorkoutsResponseDataDtoData {
  items: Array<ShortWorkoutEntity | ShortWorkoutDto>;
  pagination: ResponsePagination | ListResponsePaginationDto;
}

class ManyWorkoutsResponseDataDto {
  @ApiProperty({
    description: 'Workouts',
    type: [ShortWorkoutDto],
  })
  items: ShortWorkoutDto[];

  @ApiProperty({
    description: 'List response items pagination',
    type: ListResponsePaginationDto,
  })
  pagination: ListResponsePaginationDto;

  static from(strategy: GetTranslationsStrategy, data: ManyWorkoutsResponseDataDtoData): ManyWorkoutsResponseDataDto {
    return new ManyWorkoutsResponseDataDto(
      data.items
        .map((i) => (i instanceof ShortWorkoutDto ? i : ShortWorkoutDto.fromEntity(strategy, i)))
        .filter((val) => !!val),
      data.pagination
    );
  }

  constructor(items: Array<ShortWorkoutDto>, pagination: ResponsePagination | ListResponsePaginationDto) {
    this.items = items;

    this.pagination =
      pagination instanceof ListResponsePaginationDto ? pagination : ListResponsePaginationDto.from(pagination);
  }
}

export class GetManyWorkoutsResponseDto implements JSONLike<GetManyWorkoutsResponse> {
  @ApiProperty({ enum: ['success'], type: String })
  status: 'success' = 'success' as const;

  @ApiProperty({ type: ManyWorkoutsResponseDataDto })
  data: ManyWorkoutsResponseDataDto;

  static from(strategy: GetTranslationsStrategy, data: ManyWorkoutsResponseDataDtoData): GetManyWorkoutsResponseDto {
    return new GetManyWorkoutsResponseDto(ManyWorkoutsResponseDataDto.from(strategy, data));
  }

  constructor(data: ManyWorkoutsResponseDataDto) {
    this.data = data;
  }
}
