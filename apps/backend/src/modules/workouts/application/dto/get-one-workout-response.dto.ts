import { ApiProperty } from '@nestjs/swagger';

import type { GetOneWorkoutResponse } from '@repo/api-models';

import type { JSONLike } from 'src/shared/utils/json-like';
import type { GetTranslationsStrategy } from 'src/shared/utils/translation-strategy';

import type { WorkoutEntity } from '../../domain/entites/workout.entity';
import { WorkoutDto } from './workout.dto';

export class GetOneWorkoutResponseDto implements JSONLike<GetOneWorkoutResponse> {
  @ApiProperty({ enum: ['success'], type: String })
  status: 'success' = 'success' as const;

  @ApiProperty({ type: WorkoutDto })
  data: WorkoutDto;

  static fromEntity(strategy: GetTranslationsStrategy, workoutEntity: WorkoutEntity): GetOneWorkoutResponseDto | null {
    const workoutDto = WorkoutDto.fromEntity(strategy, workoutEntity);
    if (!workoutDto) return null;

    return new GetOneWorkoutResponseDto(workoutDto);
  }

  constructor(data: WorkoutDto) {
    this.data = data;
  }
}
