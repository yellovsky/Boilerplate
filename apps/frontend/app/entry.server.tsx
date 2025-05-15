import { PassThrough } from 'node:stream';

import { createReadableStreamFromReadable } from '@react-router/node';
import { createInstance } from 'i18next';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { type AppLoadContext, type EntryContext, ServerRouter } from 'react-router';

import { i18n, resources } from '@app/localization';
import i18next from '@app/localization/i18n.server';

// Reject all pending promises from handler functions after 10 seconds
export const streamTimeout = 10000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  context: EntryContext,
  appContext: AppLoadContext
) {
  const callbackName = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';

  const instance = createInstance();
  const lng = appContext.lang;
  const ns = i18next.getRouteNamespaces(context);
  await instance.use(initReactI18next).init({ ...i18n, lng, ns, resources });

  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <ServerRouter context={context} url={request.url} />
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

        onShellError(error: unknown) {
          reject(error);
        },

        onError(error: unknown) {
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    // Abort the streaming render pass after 11 seconds so to allow the rejected
    // boundaries to be flushed
    setTimeout(abort, streamTimeout + 1000);
  });
}
