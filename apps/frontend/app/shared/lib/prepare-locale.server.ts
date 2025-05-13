import * as Either from 'effect/Either';

import { SUPPORTED_LNGS } from '../config/i18n';

import { i18nServer } from './i18n';
import { makeSetCookieHeader } from './cookie';

export const prepareLocale = async (
  request: Request,
  responseHeaders: Headers,
): Promise<Either.Either<string, Response>> => {
  const url = new URL(request.url);
  const maybeUrlLocale = url.pathname.split('/').filter(Boolean)[0];
  const urlLocale = SUPPORTED_LNGS.find(lng => lng === maybeUrlLocale);

  if (!urlLocale) {
    const preferredLocale = await i18nServer.getLocale(request);

    const redirect =
      url.pathname === '/'
        ? `/${preferredLocale}${url.search}`
        : `/${preferredLocale}${url.pathname}${url.search}`;

    responseHeaders.set(
      'Set-Cookie',
      makeSetCookieHeader('locale', preferredLocale, {
        daysToExpire: 0,
        httpOnly: false,
        secure: false,
      }),
    );
    responseHeaders.set('Location', redirect);

    return Either.left(new Response(null, { headers: responseHeaders, status: 303 }));
  }

  return Either.right(urlLocale);
};
