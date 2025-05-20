import type { InitOptions, Namespace } from 'i18next';

import { FALLBACK_LOCALE, SUPPORTED_LOCALES } from '@shared/config';

export default {
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: 'common' satisfies Namespace,

  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: FALLBACK_LOCALE,
  // This is the list of languages your application supports
  // remove const
  supportedLngs: [...SUPPORTED_LOCALES],
} satisfies Omit<InitOptions, 'react' | 'detection'>;
