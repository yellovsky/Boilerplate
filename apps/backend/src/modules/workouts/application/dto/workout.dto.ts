import { ApiProperty } from '@nestjs/swagger';
import { Either } from 'effect';

import { ISODate, type Workout } from '@repo/api-models';

import { type ResultOrExcluded, TranslationDataMissingReason } from 'src/shared/excluded';
import { SeoDto } from 'src/shared/presentation/dtos/seo.dto';
import type { JSONLike } from 'src/shared/utils/json-like';
import type { GetTranslationsStrategy } from 'src/shared/utils/translation-strategy';

import type { WorkoutEntity } from '../../domain/entites/workout.entity';

export class WorkoutDto implements JSONLike<Workout> {
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

  @ApiProperty({ type: SeoDto })
  seo: SeoDto;

  @ApiProperty({ type: String })
  languageCode: string;

  static fromEntity(strategy: GetTranslationsStrategy, workoutEntity: WorkoutEntity): ResultOrExcluded<WorkoutDto> {
    const translations = workoutEntity.getTranslations(strategy);

    if (!translations) return Either.left(new TranslationDataMissingReason());

    return Either.right(
      new WorkoutDto(
        workoutEntity.id,
        workoutEntity.slug,
        ISODate.fromDate(workoutEntity.createdAt),
        translations.name,
        translations.languageCode,
        translations.seoTitle,
        translations.seoDescription,
        translations.seoKeywords
      )
    );
  }

  static fromEntityEffect(
    strategy: GetTranslationsStrategy,
    workoutEntity: WorkoutEntity
  ): ResultOrExcluded<WorkoutDto> {
    const translations = workoutEntity.getTranslations(strategy);

    if (!translations) return Either.left(new TranslationDataMissingReason());

    return Either.right(
      new WorkoutDto(
        workoutEntity.id,
        workoutEntity.slug,
        ISODate.fromDate(workoutEntity.createdAt),
        translations.name,
        translations.languageCode,
        translations.seoTitle,
        translations.seoDescription,
        translations.seoKeywords
      )
    );
  }

  constructor(
    id: string,
    slug: string,
    createdAt: Date | ISODate,
    name: string,
    languageCode: string,
    seoTitle: string | null,
    seoDescription: string | null,
    seoKeywords: string | null
  ) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.languageCode = languageCode;

    this.createdAt = createdAt instanceof ISODate ? createdAt : ISODate.fromDate(createdAt);

    this.seo = SeoDto.from({
      description: seoDescription,
      keywords: seoKeywords,
      title: seoTitle,
    });
  }
}
