import { ClientOnly } from 'remix-utils/client-only';
import geologicaCss from '@fontsource-variable/geologica/index.css?url';
import interCss from '@fontsource-variable/inter/index.css?url';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import robotoMonoCss from '@fontsource-variable/roboto-mono/index.css?url';
import { Suspense } from 'react';
import twCss from '@repo/theme/tailwind.css?url';
import type { LinkDescriptor, LinksFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { getQueryClient } from '@shared/lib/query-client';
import { makeLoader } from '@shared/lib/loader';

import { App } from '@app/app';
import { AppProviders } from '@app/app-providers';
import { AppSuspenseWarning } from '@app/app-suspense-warning';

import { getRootLoaderData } from './load-data.server';
import rootCss from './root.css?url';

const cssAssets: LinkDescriptor[] = [twCss, rootCss, geologicaCss, interCss, robotoMonoCss]
  .map(href => href.split('?')[0])
  .map(href => ({ as: 'style', href, rel: 'stylesheet' }));

export const links: LinksFunction = () => [...cssAssets];

const queryClient = getQueryClient();

export const loader = makeLoader(getRootLoaderData);

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();

  return (
    <AppProviders queryClient={queryClient}>
      <App {...data}>
        <Suspense fallback={<AppSuspenseWarning />}>
          <Outlet />
        </Suspense>
        <ClientOnly>{() => <ReactQueryDevtools client={queryClient} />}</ClientOnly>
      </App>
    </AppProviders>
  );
}
