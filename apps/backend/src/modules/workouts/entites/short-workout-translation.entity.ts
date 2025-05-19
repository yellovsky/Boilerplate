export interface ShortWorkoutTranslationEntityData {
  name: string;
  languageCode: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class ShortWorkoutTranslationEntity {
  static from(data: ShortWorkoutTranslationEntityData): ShortWorkoutTranslationEntity {
    return new ShortWorkoutTranslationEntity(
      data.name,
      data.languageCode,
      data.publishedAt,
      data.createdAt,
      data.updatedAt
    );
  }

  constructor(
    public readonly name: string,
    public readonly languageCode: string,
    public readonly publishedAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  filterPublished(): ShortWorkoutTranslationEntity | null {
    return this.publishedAt ? this : null;
  }
}
