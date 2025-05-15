export const SUPPORTED_LOCALES = ['en', 'ru'] as const;
export const FALLBACK_LOCALE = SUPPORTED_LOCALES[0];

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const isLocale = (language: unknown): language is Locale => SUPPORTED_LOCALES.some((lng) => lng === language);
