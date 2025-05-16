import type { InitOptions, Namespace } from 'i18next';

import { FALLBACK_LOCALE, SUPPORTED_LOCALES } from '@shared/config';

export default {
  // This is the list of languages your application supports
  // remove const
  supportedLngs: [...SUPPORTED_LOCALES],

  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: FALLBACK_LOCALE,

  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: 'common' satisfies Namespace,
} satisfies Omit<InitOptions, 'react' | 'detection'>;
