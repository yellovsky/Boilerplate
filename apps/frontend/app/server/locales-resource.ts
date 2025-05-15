import type { Context } from 'hono';

import { getLocalesResource } from '@app/localization';

export const localesResourceHandler = async (c: Context) => {
  const lng = c.req.query('lng');
  const ns = c.req.query('ns');
  if (!lng || !ns) return new Response('Not found', { status: 404 });

  const resource = await getLocalesResource(lng, ns);
  return resource ? new Response(JSON.stringify(resource)) : new Response('Not found', { status: 404 });
};
