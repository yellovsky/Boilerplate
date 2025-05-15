import geologicaCss from '@fontsource-variable/geologica/index.css?url';
import interCss from '@fontsource-variable/inter/index.css?url';
import { Provider } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import robotoMonoCss from '@fontsource-variable/roboto-mono/index.css?url';
import twCss from '@repo/theme/tailwind.css?url';
import { useChangeLanguage } from 'remix-i18next/react';
import { useHydrateAtoms } from 'jotai/utils';
import { useTranslation } from 'react-i18next';
import { FC, PropsWithChildren, Suspense } from 'react';
import type { LinkDescriptor, LinksFunction } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

import { getQueryClient } from '@shared/lib/query-client';
import { ClientHintCheck, getHints } from '~/app/client-hints';

import { AppSuspenseWarning } from '@app/app-suspense-warning';

import { LanguageSwitcher } from '@features/language-switcher';

import rootCss from './root.css?url';
import { Route } from './+types/root';

import {
  ColorScheme,
  ColorSchemeSwitcher,
  fallbackColorSchemeAtom,
  getCookieStringColorScheme,
  isColorScheme,
  selectedColorSchemeAtom,
} from './features/theme';

const cssAssets: LinkDescriptor[] = [twCss, rootCss, geologicaCss, interCss, robotoMonoCss]
  .map(href => href.split('?')[0])
  .map(href => ({ as: 'style', href, rel: 'stylesheet' }));

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
  i18n: 'common',
};

// TODO Think aboun move providers to app
export default function App({ loaderData }: Route.ComponentProps) {
  const { lang, clientEnv } = loaderData;

  useChangeLanguage(lang);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(clientEnv)}` }} />
      <Outlet />
    </>
  );
}

interface HydrateAtomsProps extends PropsWithChildren {
  fallbackColorScheme: ColorScheme;
  selectedColorScheme: ColorScheme | null;
  queryClient: QueryClient;
}

// see: https://jotai.org/docs/extensions/query#example
const HydrateAtoms: FC<HydrateAtomsProps> = props => {
  useHydrateAtoms([
    [queryClientAtom, props.queryClient],
    [fallbackColorSchemeAtom, props.fallbackColorScheme],
    [selectedColorSchemeAtom, props.selectedColorScheme],
  ]);

  return props.children;
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const loaderData = useLoaderData<typeof loader>();

  return (
    <html className="overflow-x-hidden overflow-y-auto" dir={i18n.dir()} lang={i18n.language}>
      <head>
        <ClientHintCheck />
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>

      <body className="h-full w-full">
        <Suspense fallback={<AppSuspenseWarning />}>
          <QueryClientProvider client={queryClient}>
            <Provider>
              <HydrateAtoms
                fallbackColorScheme={loaderData.hints.theme}
                queryClient={queryClient}
                selectedColorScheme={loaderData.selectedColorScheme}
              >
                {children}
                <LanguageSwitcher />
                <ColorSchemeSwitcher />
              </HydrateAtoms>
            </Provider>
            <ReactQueryDevtools />
          </QueryClientProvider>
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
      case 200:
        return '200';
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
    <div className="placeholder-index relative flex h-full min-h-screen w-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 sm:pt-8 sm:pb-16 dark:bg-white dark:from-blue-950 dark:to-blue-900">
      <div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
        <div className="relative flex min-h-72 flex-col justify-center p-1 sm:overflow-hidden sm:rounded-2xl md:p-4 lg:p-6">
          <h1 className="w-full pb-2 text-center text-2xl text-red-600">
            {t(`error.${errorStatusCode}.title`)}
          </h1>
          <p className="w-full text-center text-lg dark:text-white">
            {t(`error.${errorStatusCode}.description`)}
          </p>
        </div>
      </div>
    </div>
  );
};
