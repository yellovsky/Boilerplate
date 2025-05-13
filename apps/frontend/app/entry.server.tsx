import * as Either from 'effect/Either';
import { createInstance } from 'i18next';
import { createReadableStreamFromReadable } from '@remix-run/node';
import { isbot } from 'isbot';
import { PassThrough } from 'node:stream';
import { RemixServer } from '@remix-run/react';
import { renderToPipeableStream } from 'react-dom/server';
import { resolve } from 'node:path';
import type { AppLoadContext, EntryContext } from '@remix-run/node';
import FsBackend, { type FsBackendOptions } from 'i18next-fs-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import i18n from '@shared/config/i18n';
import { i18nServer } from '@shared/lib/i18n';
import { prepareLocale } from '@shared/lib/prepare-locale.server';
import { getCookieFromHeader, makeSetCookieHeader } from '@shared/lib/cookie';

const ABORT_DELAY = 5_000;

const setLocaleCookie = (locale: string, request: Request, responseHeaders: Headers) => {
  const cookieHeader = request.headers.get('Cookie');
  const cookieLocale = cookieHeader ? getCookieFromHeader(cookieHeader, 'locale') : null;

  if (cookieLocale !== locale) {
    responseHeaders.set(
      'Set-Cookie',
      makeSetCookieHeader('locale', locale, { daysToExpire: 0, httpOnly: false, secure: false }),
    );
  }
};

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  const bot = isbot(request.headers.get('user-agent') || '');

  const eitherLocale = await prepareLocale(request, responseHeaders);

  // Redirect and set cookie for new url with locale
  if (Either.isLeft(eitherLocale)) return eitherLocale.left;

  const locale = eitherLocale.right;
  if (!bot) setLocaleCookie(locale, request, responseHeaders);

  const instance = createInstance();
  await instance
    .use(initReactI18next)
    .use(FsBackend)
    .init<FsBackendOptions>({
      ...i18n,
      backend: {
        loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
      },
      lng: locale,
      ns: i18nServer.getRouteNamespaces(remixContext),
    });

  const callbackName = bot ? 'onAllReady' : 'onShellReady';

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer abortDelay={ABORT_DELAY} context={remixContext} url={request.url} />
      </I18nextProvider>,
      {
        [callbackName]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
        onShellError(error: unknown) {
          reject(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
