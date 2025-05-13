import Backend from 'i18next-fs-backend';
import { RemixI18Next } from 'remix-i18next/server';
import { resolve } from 'node:path';

import i18n from '@shared/config/i18n';

export const i18nServer = new RemixI18Next({
  detection: {
    fallbackLanguage: i18n.fallbackLng,
    supportedLanguages: [...i18n.supportedLngs], // remove const
  },
  i18next: { ...i18n, backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') } },
  plugins: [Backend],
});
