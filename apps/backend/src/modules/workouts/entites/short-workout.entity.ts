import * as Either from 'effect/Either';

import { NotPublishedReason } from 'src/shared/excluded';
import type { GetTranslationsStrategy, Translatable } from 'src/shared/utils/translation-strategy';

import {
  ShortWorkoutTranslationEntity,
  type ShortWorkoutTranslationEntityData,
} from './short-workout-translation.entity';

interface ShortWorkoutEntityData {
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  translations: Array<ShortWorkoutTranslationEntityData | ShortWorkoutTranslationEntity>;
}

export class ShortWorkoutEntity implements Translatable<ShortWorkoutTranslationEntity> {
  static from(data: ShortWorkoutEntityData): ShortWorkoutEntity {
    return new ShortWorkoutEntity(
      data.id,
      data.slug,
      data.createdAt,
      data.updatedAt,
      data.publishedAt,
      data.translations.map((tr) =>
        tr instanceof ShortWorkoutTranslationEntity ? tr : ShortWorkoutTranslationEntity.from(tr)
      )
    );
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly publishedAt: Date | null,
    public readonly translations: ShortWorkoutTranslationEntity[]
  ) {}

  getTranslations(strategy: GetTranslationsStrategy): ShortWorkoutTranslationEntity | null {
    const byLocale = this.translations.find((t) => t.languageCode === strategy.locale);
    if (byLocale) return byLocale;

    if (strategy.fallbackLocale) {
      const byFallbackLocale = this.translations.find((t) => t.languageCode === strategy.fallbackLocale);
      if (byFallbackLocale) return byFallbackLocale;
    }

    if (strategy.fallbackFirstDefined) return this.translations.at(0) || null;
    return null;
  }

  filterPublished(): Either.Either<ShortWorkoutEntity, NotPublishedReason> {
    if (!this.publishedAt) return Either.left(new NotPublishedReason());

    const publishedTranslations = this.translations.map((t) => t.filterPublished()).filter((val) => !!val);
    if (!publishedTranslations.length) return Either.left(new NotPublishedReason());

    return Either.right(
      ShortWorkoutEntity.from({
        createdAt: this.createdAt,
        id: this.id,
        publishedAt: this.publishedAt,
        slug: this.slug,
        translations: publishedTranslations,
        updatedAt: this.updatedAt,
      })
    );
  }
}
