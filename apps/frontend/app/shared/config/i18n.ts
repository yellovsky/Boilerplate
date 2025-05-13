export const FALLBACK_LNG = 'en';
export const SUPPORTED_LNGS = [FALLBACK_LNG, 'ru'] as const;
export const DEFAULT_NS = 'common';

export default {
  defaultNS: DEFAULT_NS,
  fallbackLng: FALLBACK_LNG,
  react: { useSuspense: true },
  supportedLngs: SUPPORTED_LNGS,
};
