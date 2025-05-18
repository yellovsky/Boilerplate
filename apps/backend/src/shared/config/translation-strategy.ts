import type { GetTranslationsStrategy } from '../utils/translation-strategy';

interface MakeDefaultTranslationStrategyParams {
  fallbackLocale: string;
  locale: string;
}

export const makeDefaultTranslationStrategy = (
  params: MakeDefaultTranslationStrategyParams
): GetTranslationsStrategy => ({
  ...params,
  fallbackFirstDefined: true,
});
