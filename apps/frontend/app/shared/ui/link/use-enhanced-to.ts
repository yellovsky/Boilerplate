import type { To } from 'react-router';

import { Locale } from '@shared/config/locale';
import { useLocale } from '@shared/lib/use-locale';

import { i18n } from '@app/localization';

const removeLocaleFromPathname = (pathname: string): string =>
  pathname.replace(new RegExp(`^/(${i18n.supportedLngs.join('|')})`), '');

const addLocaleToPathname = (pathname: string, locale: string): string =>
  pathname.startsWith('http') ? pathname : `/${locale}${removeLocaleFromPathname(pathname)}`;

const setPathnameLocale = (pathname: string, locale: string): string =>
  addLocaleToPathname(pathname, locale).replace(/\/$/, '');

export const useEnhancedTo = ({ language, to }: { language?: Locale; to: To }): To => {
  const lng = useLocale();
  const lang = language ?? lng;

  return typeof to === 'string'
    ? setPathnameLocale(to, lang)
    : !to.pathname
      ? to
      : { ...to, pathname: setPathnameLocale(to.pathname, lang) };
};
