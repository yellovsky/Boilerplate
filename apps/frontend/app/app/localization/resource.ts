import { isLocale, Locale, SUPPORTED_LOCALES } from '@shared/config/locale';

import commonEn from './common.en.json';
import commonRu from './common.ru.json';

type Resource = {
  common: typeof commonEn;
};

export type Namespace = keyof Resource;
const isNamespace = (ns: string): ns is Namespace => ns in resources[SUPPORTED_LOCALES[0]];

export const resources: Record<Locale, Resource> = {
  en: { common: commonEn },
  ru: { common: commonRu },
};

export const getLocalesResource = async (lng: string, ns: string): Promise<object | null> =>
  !isLocale(lng) || !isNamespace(ns) ? null : resources[lng][ns];

declare module 'i18next' {
  export interface CustomTypeOptions {
    defaultNS: 'common';
    fallbackNS: 'common';

    // custom resources type
    resources: Resource;
  }
}
