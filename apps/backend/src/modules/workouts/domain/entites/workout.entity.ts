import { GetTranslationsStrategy, Translatable } from 'src/shared/utils/translation-strategy';

import {
  WorkoutTranslationEntity,
  WorkoutTranslationsEntityData,
} from './workout-translation.entity';

interface WorkoutEntityData {
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  translations: WorkoutTranslationsEntityData[];
}

export class WorkoutEntity implements Translatable<WorkoutTranslationEntity> {
  static from(data: WorkoutEntityData): WorkoutEntity {
    return new WorkoutEntity(
      data.id,
      data.slug,
      data.createdAt,
      data.updatedAt,
      data.publishedAt,
      data.translations.map(WorkoutTranslationEntity.from),
    );
  }

  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly publishedAt: Date | null,
    public readonly translations: WorkoutTranslationEntity[],
  ) {}

  getTranslations(strategy: GetTranslationsStrategy): WorkoutTranslationEntity | null {
    const byLocale = this.translations.find(t => t.languageCode === strategy.locale);
    if (byLocale) return byLocale;

    if (strategy.fallbackLocale) {
      const byFallbackLocale = this.translations.find(
        t => t.languageCode === strategy.fallbackLocale,
      );
      if (byFallbackLocale) return byFallbackLocale;
    }

    if (strategy.fallbackFirstDefined) return this.translations.at(0) || null;
    return null;
  }

  filterPublished(): WorkoutEntity | null {
    if (!this.publishedAt) return null;

    const publishedTranslations = this.translations
      .map(t => t.filterPublished())
      .filter(val => !!val);
    if (!publishedTranslations.length) return null;

    return WorkoutEntity.from({
      createdAt: this.createdAt,
      id: this.id,
      publishedAt: this.publishedAt,
      slug: this.slug,
      translations: publishedTranslations,
      updatedAt: this.updatedAt,
    });
  }
}
