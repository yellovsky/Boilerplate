export interface GetTranslationsStrategy {
  locale: string;
  fallbackLocale?: string;
  fallbackFirstDefined?: boolean;
}

export interface Translatable<TTranslation extends { languageCode: string }> {
  translations: TTranslation[];
  getTranslations(strategy: GetTranslationsStrategy): TTranslation | null;
}
