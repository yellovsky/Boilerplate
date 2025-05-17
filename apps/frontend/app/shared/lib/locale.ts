import parser from 'accept-language-parser';
import type { To } from 'react-router';

import { FALLBACK_LOCALE, isLocale, type Locale, SUPPORTED_LOCALES } from '../config';

const isValidBCP47Locale = (locale: string): boolean => {
  const bcp47Regex =
    /^[a-zA-Z]{2,3}(-[a-zA-Z]{3}){0,3}(-[a-zA-Z]{4})?(-[a-zA-Z]{2}|\d{3})?(-[a-zA-Z0-9]{5,8}|\d[a-zA-Z0-9]{3})*(-[a-wy-zA-WY-Z0-9](-[a-zA-Z0-9]{2,8})+)*(-x(-[a-zA-Z0-9]{1,8})+)?$/;

  return bcp47Regex.test(locale);
};

export const parseLocale = (maybeLocale: string): string | null =>
  isValidBCP47Locale(maybeLocale) ? maybeLocale : null;

const isExternalPath = (path: string): boolean => /^https?:\/\//.test(path);

export function getLocaleFromTo(to: To): Locale | null {
  const pathname = typeof to === 'string' ? to : to.pathname;
  if (!pathname) return null;

  const [, maybeLocale] = pathname.split('/');
  return isLocale(maybeLocale) ? maybeLocale : null;
}

export function getAnyLocaleFromTo(to: To): string | null {
  const pathname = typeof to === 'string' ? to : to.pathname;
  if (!pathname) return null;

  const [, maybeLocale] = pathname.split('/');
  return parseLocale(maybeLocale) ? maybeLocale : null;
}

const removeLocaleFromPathname = (pathname: string): string => {
  if (isExternalPath(pathname)) return pathname;

  const [, maybeLocale, ...parts] = pathname.split('/');
  const parsedLocale = parseLocale(maybeLocale);
  return !parsedLocale ? pathname : `/${parts.join('/')}`;
};

export function removeLocaleFromTo(to: string): string;
export function removeLocaleFromTo(to: Exclude<To, string>): Exclude<To, string>;
export function removeLocaleFromTo(to: To): string | To {
  if (typeof to === 'string') return removeLocaleFromPathname(to);
  return !to.pathname ? to : { ...to, pathname: removeLocaleFromPathname(to.pathname) };
}

const addLocaleLocaleToPathname = (locale: Locale, pathname: string): string =>
  `/${locale}${removeLocaleFromPathname(pathname)}`;

export function addLocaleLocaleToTo(locale: Locale, to: string): string;
export function addLocaleLocaleToTo(locale: Locale, to: Exclude<To, string>): Exclude<To, string>;
export function addLocaleLocaleToTo(locale: Locale, to: To): string | To {
  if (typeof to === 'string') return addLocaleLocaleToPathname(locale, to);
  return !to.pathname ? to : { ...to, pathname: addLocaleLocaleToPathname(locale, to.pathname) };
}

export const getRequestUrlLocale = (request: Request): Locale | null => {
  const url = new URL(request.url);
  return getLocaleFromTo(url.pathname);
};

export const getRequestCookieLocale = (request: Request): Locale | null => {
  const cookieHeader = request.headers.get('Cookie');
  const localeCookie = cookieHeader
    ?.split('; ')
    // TODO magic string
    .find((row) => row.startsWith('locale='))
    ?.split('=')[1];

  return isLocale(localeCookie) ? localeCookie : null;
};

const getRequestPreferredLocale = (request: Request): Locale | null => {
  const acceptLanguageHeader = request.headers.get('accept-language');
  return acceptLanguageHeader ? parser.pick(SUPPORTED_LOCALES, acceptLanguageHeader) : null;
};

export const getRequestLocale = (request: Request): Locale =>
  getRequestUrlLocale(request) ||
  getRequestCookieLocale(request) ||
  getRequestPreferredLocale(request) ||
  FALLBACK_LOCALE;
