import { RemixI18Next } from 'remix-i18next/server';

import { getRequestLocale } from '@shared/lib/locale';

import i18n from './i18n';
import { resources } from './resource';

const i18next = new RemixI18Next({
  detection: {
    fallbackLanguage: i18n.fallbackLng,

    async findLocale(request) {
      return getRequestLocale(request);
    },
    supportedLanguages: i18n.supportedLngs,
  },

  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
    resources,
  },
});

export default i18next;
