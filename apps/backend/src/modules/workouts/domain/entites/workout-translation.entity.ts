export interface WorkoutTranslationsEntityData {
  name: string;
  languageCode: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  seoTitle: string | null;
  seoKeywords: string | null;
  seoDescription: string | null;
}

export class WorkoutTranslationEntity {
  static from(data: WorkoutTranslationsEntityData): WorkoutTranslationEntity {
    return new WorkoutTranslationEntity(
      data.name,
      data.languageCode,
      data.publishedAt,
      data.createdAt,
      data.updatedAt,
      data.seoTitle,
      data.seoKeywords,
      data.seoDescription
    );
  }

  constructor(
    public readonly name: string,
    public readonly languageCode: string,
    public readonly publishedAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly seoTitle: string | null,
    public readonly seoKeywords: string | null,
    public readonly seoDescription: string | null
  ) {}

  filterPublished(): WorkoutTranslationEntity | null {
    return this.publishedAt ? this : null;
  }
}
