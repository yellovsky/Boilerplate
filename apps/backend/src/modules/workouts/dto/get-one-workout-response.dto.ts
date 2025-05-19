import { ApiProperty } from '@nestjs/swagger';
import { Either } from 'effect';

import type { GetOneWorkoutResponse } from '@repo/api-models';

import type { ResultOrExcluded } from 'src/shared/excluded';
import type { JSONLike } from 'src/shared/utils/json-like';
import type { GetTranslationsStrategy } from 'src/shared/utils/translation-strategy';

import type { WorkoutEntity } from '../entites/workout.entity';
import { WorkoutDto } from './workout.dto';

export class GetOneWorkoutResponseDto implements JSONLike<GetOneWorkoutResponse> {
  @ApiProperty({ enum: ['success'], type: String })
  status: 'success' = 'success' as const;

  @ApiProperty({ type: WorkoutDto })
  data: WorkoutDto;

  static fromEntity(
    strategy: GetTranslationsStrategy,
    workoutEntity: WorkoutEntity
  ): ResultOrExcluded<GetOneWorkoutResponseDto> {
    return Either.map(
      WorkoutDto.fromEntity(strategy, workoutEntity),
      (workoutDto) => new GetOneWorkoutResponseDto(workoutDto)
    );
  }

  static fromEntityEffect(
    strategy: GetTranslationsStrategy,
    workoutEntity: WorkoutEntity
  ): ResultOrExcluded<GetOneWorkoutResponseDto> {
    return WorkoutDto.fromEntityEffect(strategy, workoutEntity).pipe(
      Either.map((workoutDto) => new GetOneWorkoutResponseDto(workoutDto))
    );
  }

  constructor(data: WorkoutDto) {
    this.data = data;
  }
}
