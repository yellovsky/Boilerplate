import type { Context } from 'hono';
import { i18next } from 'remix-hono/i18next';

import { getClientEnv, getServerEnv } from '~/env.server';

export const getLoadContext = async (c: Context) => {
  // get the locale from the context
  const locale = i18next.getLocale(c);
  // get t function for the default namespace
  const t = await i18next.getFixedT(c);
  // get the server environment
  const env = getServerEnv();

  return {
    clientEnv: getClientEnv(),
    env,
    isProductionDeployment: env.APP_ENV === 'production',
    lang: locale,
    t,

    // We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
    body: c.body,
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface LoadContext extends Awaited<ReturnType<typeof getLoadContext>> {}

/**
 * Declare our loaders and actions context type
 */
declare module 'react-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AppLoadContext extends Omit<LoadContext, 'body'> {}
}
