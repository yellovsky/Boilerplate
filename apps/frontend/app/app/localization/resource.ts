import { isLocale, type Locale, SUPPORTED_LOCALES } from '@shared/config';

import { AUTH_NS } from '@features/auth';
import { authEn, authRu } from '@features/auth/translations';
import { WORKOUTS_NS } from '@features/workouts';
import { workoutsEn, workoutsRu } from '@features/workouts/translations';

import commonEn from './common.en.server';
import commonRu from './common.ru.server';

export type Namespace = keyof Resource;
const isNamespace = (ns: string): ns is Namespace => ns in resources[SUPPORTED_LOCALES[0]];

type ResourceShape<TResource> = {
  [K in keyof TResource]: TResource[K] extends string ? string : ResourceShape<TResource[K]>;
};

export const COMMON_NS = 'common';

type Resource = {
  [COMMON_NS]: typeof commonEn;
  [WORKOUTS_NS]: ResourceShape<typeof workoutsEn>;
  [AUTH_NS]: ResourceShape<typeof authEn>;
};

export const resources: Record<Locale, Resource> = {
  en: { [COMMON_NS]: commonEn, [WORKOUTS_NS]: workoutsEn, [AUTH_NS]: authEn },
  ru: { [COMMON_NS]: commonRu, [WORKOUTS_NS]: workoutsRu, [AUTH_NS]: authRu },
};

export const getLocalesResource = async (lng: string, ns: string): Promise<object | null> =>
  !isLocale(lng) || !isNamespace(ns) ? null : resources[lng][ns];

type CurlyBracesResources<T> = {
  [K in keyof T]: T[K] extends string ? K : CurlyBracesResources<T[K]>;
};

declare module 'i18next' {
  export interface CustomTypeOptions {
    defaultNS: 'common';
    fallbackNS: 'common';

    // custom resources type
    resources: CurlyBracesResources<Resource>;
  }
}
