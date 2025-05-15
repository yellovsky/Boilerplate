import { createHonoServer } from 'react-router-hono-server/node';
import { i18next } from 'remix-hono/i18next';

import i18nServer from '@app/localization/i18n.server';

import { getLoadContext } from './context';
import { localesResourceHandler } from './locales-resource';

export default await createHonoServer({
  configure(server) {
    server.use('/resource/locales', localesResourceHandler);
    server.use('*', i18next(i18nServer));
  },
  defaultLogger: false,
  getLoadContext,
});
