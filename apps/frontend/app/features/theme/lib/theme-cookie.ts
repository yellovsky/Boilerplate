import Cookies from 'js-cookie';

import { type ColorScheme, isColorScheme } from '../model/color-scheme';

const COLOR_SCHEME_COOKIE_NAME = 'prefers-color-scheme';

export const getCookieStringColorScheme = (cookieString: string | null | undefined): ColorScheme | null => {
  const val = cookieString
    ?.split('; ')
    .find((row) => row.startsWith(`${COLOR_SCHEME_COOKIE_NAME}=`))
    ?.split('=')[1];

  return isColorScheme(val) ? val : null;
};

export const updateDocumentCookieColorScheme = (colorScheme: ColorScheme | 'auto') => {
  if (colorScheme === 'auto') Cookies.remove(COLOR_SCHEME_COOKIE_NAME);
  else Cookies.set(COLOR_SCHEME_COOKIE_NAME, colorScheme, { expires: 365, path: '/' });
};
