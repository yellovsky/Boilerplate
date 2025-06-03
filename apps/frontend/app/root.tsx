import geologicaCss from '@fontsource-variable/geologica/index.css?url';
import interCss from '@fontsource-variable/inter/index.css?url';
import robotoMonoCss from '@fontsource-variable/roboto-mono/index.css?url';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { queryClientAtom } from 'jotai-tanstack-query';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import type { LinkDescriptor, LinksFunction } from 'react-router';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from 'react-router';
import { useChangeLanguage } from 'remix-i18next/react';

import { getQueryClient } from '@shared/lib/query-client';

import { AppSuspenseWarning } from '@app/app-suspense-warning';
import { ClientHintCheck, getHints } from '@app/client-hints';

import { colorSchemeAtom } from '@features/theme/model/color-scheme-atom';

import type { Route } from './+types/root';
import {
  fallbackColorSchemeAtom,
  getCookieStringColorScheme,
  isColorScheme,
  selectedColorSchemeAtom,
  useColorSchemeManager,
} from './features/theme';
import rootCss from './root.css?url';
import { theme } from './theme';

const cssAssets: LinkDescriptor[] = [rootCss, geologicaCss, interCss, robotoMonoCss]
  .map((href) => href.split('?')[0])
  .map((href) => ({ as: 'style', href, rel: 'stylesheet' }));

export const links: LinksFunction = () => [...cssAssets];

const queryClient = getQueryClient();

export async function loader({ context, request }: Route.LoaderArgs) {
  const { lang, clientEnv } = context;
  const hints = getHints(request);

  const cookieHeader = request.headers.get('Cookie');

  const storedTheme = getCookieStringColorScheme(cookieHeader);
  const selectedColorScheme = isColorScheme(storedTheme) ? storedTheme : null;

  return { clientEnv, hints, lang, selectedColorScheme };
}

export const handle = {
  i18n: ['common', 'auth'],
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { lang, clientEnv } = loaderData;

  useChangeLanguage(lang);

  return (
    <>
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: just set evn variables */}
      <script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(clientEnv)}` }} />
      <Outlet />
    </>
  );
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const loaderData = useLoaderData<typeof loader>();

  useHydrateAtoms([
    [queryClientAtom, queryClient],
    [fallbackColorSchemeAtom, loaderData.hints.theme],
    [selectedColorSchemeAtom, loaderData.selectedColorScheme],
  ]);

  const colorScheme = useAtomValue(colorSchemeAtom);
  const colorSchemeManager = useColorSchemeManager();

  return (
    <html data-mantine-color-scheme={colorScheme} dir={i18n.dir()} lang={i18n.language} style={{ colorScheme }}>
      <head>
        <ClientHintCheck />
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>

      <body className="h-full w-full">
        <Suspense fallback={<AppSuspenseWarning />}>
          <MantineProvider colorSchemeManager={colorSchemeManager} theme={theme}>
            <QueryClientProvider client={queryClient}>
              {children}
              <ReactQueryDevtools />
            </QueryClientProvider>
          </MantineProvider>
        </Suspense>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export const ErrorBoundary = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  // NOTE loaderData is accessible in error boundary
  const loaderData = useLoaderData<typeof loader>();
  console.warn('loaderData in error boundary', loaderData);

  const statusCode = () => {
    if (!isRouteErrorResponse(error)) return '500';

    switch (error.status) {
      case 403:
        return '403';
      case 404:
        return '404';
      default:
        return '500';
    }
  };

  const errorStatusCode = statusCode();

  return (
    <div className="relative flex h-full min-h-screen w-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 placeholder-index sm:pt-8 sm:pb-16 dark:bg-white dark:from-blue-950 dark:to-blue-900">
      <div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
        <div className="relative flex min-h-72 flex-col justify-center p-1 sm:overflow-hidden sm:rounded-2xl md:p-4 lg:p-6">
          <h1 className="w-full pb-2 text-center text-2xl text-red-600">{t(`error.${errorStatusCode}.text`)}</h1>
          <p className="w-full text-center text-lg dark:text-white">{t(`error.${errorStatusCode}.description`)}</p>
        </div>
      </div>
    </div>
  );
};
