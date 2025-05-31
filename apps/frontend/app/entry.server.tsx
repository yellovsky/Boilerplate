import { PassThrough } from 'node:stream';

import { createReadableStreamFromReadable } from '@react-router/node';
import { createInstance } from 'i18next';
import ICU from 'i18next-icu';
import { isbot } from 'isbot';
import { Provider } from 'jotai';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { type AppLoadContext, type EntryContext, ServerRouter } from 'react-router';

import { isLocale, type Locale } from '@shared/config';
import { getSetCookieHeader } from '@shared/lib/cookie';
import { getRequestCookieLocale, getRequestLocale, getRequestUrlLocale } from '@shared/lib/locale';

import { i18n, resources } from '@app/localization';
import i18next from '@app/localization/i18n.server';

// Reject all pending promises from handler functions after 10 seconds
export const streamTimeout = 10000;

const setResponseCookieLocale = (responseHeaders: Headers, locale: Locale) => {
  responseHeaders.set(
    'Set-Cookie',
    getSetCookieHeader('locale', locale, { daysToExpire: 0, httpOnly: false, secure: false })
  );
};

const makeRedirectToUrlWithLocaleRequest = (request: Request, responseHeaders: Headers, locale: Locale) => {
  const url = new URL(request.url);
  const redirect = url.pathname === '/' ? `/${locale}${url.search}` : `/${locale}${url.pathname}${url.search}`;

  setResponseCookieLocale(responseHeaders, locale);
  responseHeaders.set('Location', redirect);

  return new Response(null, { headers: responseHeaders, status: 303 });
};

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  context: EntryContext,
  appContext: AppLoadContext
) {
  const isBotRequest = isbot(request.headers.get('user-agent'));
  const callbackName = isBotRequest ? 'onAllReady' : 'onShellReady';

  const instance = createInstance();
  const locale = appContext.lang;

  /**
   * Just in case. TS typings (locale is string)
   */
  if (!isLocale(locale)) {
    return makeRedirectToUrlWithLocaleRequest(request, responseHeaders, getRequestLocale(request));
  }

  /**
   * Redirect to location with locale in url
   */
  if (locale !== getRequestUrlLocale(request)) {
    return makeRedirectToUrlWithLocaleRequest(request, responseHeaders, locale);
  }

  /**
   * For browser requests sync cookie locale
   */
  if (!isBotRequest && getRequestCookieLocale(request) !== locale) setResponseCookieLocale(responseHeaders, locale);

  const ns = i18next.getRouteNamespaces(context);
  await instance
    .use(ICU)
    .use(initReactI18next)
    .init({ ...i18n, lng: locale, ns, resources });

  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <Provider>
          <ServerRouter context={context} url={request.url} />
        </Provider>
      </I18nextProvider>,
      {
        [callbackName]: () => {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },

        onError(error: unknown) {
          if (shellRendered) {
            console.error(error);
          }
        },

        onShellError(error: unknown) {
          reject(error);
        },
      }
    );

    // Abort the streaming render pass after 11 seconds so to allow the rejected
    // boundaries to be flushed
    setTimeout(abort, streamTimeout + 1000);
  });
}
