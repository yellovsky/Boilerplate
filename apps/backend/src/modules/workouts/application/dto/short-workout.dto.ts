import { ApiProperty } from '@nestjs/swagger';

import { ISODate, type ShortWorkout } from '@repo/api-models';

import type { JSONLike } from 'src/shared/utils/json-like';
import type { GetTranslationsStrategy } from 'src/shared/utils/translation-strategy';

import type { ShortWorkoutEntity } from '../../domain/entites/short-workout.entity';

export class ShortWorkoutDto implements JSONLike<ShortWorkout> {
  @ApiProperty({
    description: 'Workout ID',
    example: 'f4d3d5f8-1234-4567-b89e-1234567890ab',
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    description: 'Workout slug',
    example: 'f4d3d5f8-1234-4567-b89e-1234567890ab',
    uniqueItems: true,
  })
  slug: string;

  @ApiProperty({ example: 'Push Day Workout' })
  name: string;

  @ApiProperty({ example: '2025-04-09T10:00:00Z', type: String })
  createdAt: ISODate;

  @ApiProperty({ type: String })
  languageCode: string;

  static fromEntity(strategy: GetTranslationsStrategy, workoutEntity: ShortWorkoutEntity): ShortWorkoutDto | null {
    const translations = workoutEntity.getTranslations(strategy);

    if (!translations) return null;

    return new ShortWorkoutDto(
      workoutEntity.id,
      workoutEntity.slug,
      ISODate.fromDate(workoutEntity.createdAt),
      translations.name,
      translations.languageCode
    );
  }

  constructor(id: string, slug: string, createdAt: Date | ISODate, name: string, languageCode: string) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.languageCode = languageCode;

    this.createdAt = createdAt instanceof ISODate ? createdAt : ISODate.fromDate(createdAt);
  }
}
