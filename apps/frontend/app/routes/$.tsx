import { redirect } from 'react-router';

import { addLocaleLocaleToTo, getAnyLocaleFromTo } from '@shared/lib/locale';
import { FALLBACK_LOCALE, isLocale } from '@shared/config/locale';

import i18next from '@app/localization/i18n.server';

import { Route } from './+types/$';
import { URL } from 'url';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pathname = [url.pathname, url.search].filter(Boolean).join();

  const localeFromUrl = getAnyLocaleFromTo(pathname);
  if (!isLocale(localeFromUrl)) {
    const requestLocale = await i18next.getLocale(request);
    const supportedLocale = isLocale(requestLocale) ? requestLocale : FALLBACK_LOCALE;
    return redirect(addLocaleLocaleToTo(supportedLocale, pathname));
  }
}

export default function NotFoundRoute() {
  return <div>not found</div>;
}
