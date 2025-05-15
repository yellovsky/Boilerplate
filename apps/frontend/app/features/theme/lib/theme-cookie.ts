import { addYears } from 'date-fns';
import { ColorScheme, isColorScheme } from '../model/color-scheme';

const COLOR_SCHEME_COOKIE_NAME = 'prefers-color-scheme';

export const getCookieStringColorScheme = (
  cookieString: string | null | undefined,
): ColorScheme | null => {
  const val = cookieString
    ?.split('; ')
    .find(row => row.startsWith(`${COLOR_SCHEME_COOKIE_NAME}=`))
    ?.split('=')[1];

  return isColorScheme(val) ? val : null;
};

export const updateDocumentCookieColorScheme = (colorScheme: ColorScheme | 'system') => {
  if (colorScheme === 'system') {
    document.cookie = `${COLOR_SCHEME_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } else {
    document.cookie = `${COLOR_SCHEME_COOKIE_NAME}=${colorScheme};expires=${addYears(new Date(), 1).toUTCString()}; path=/`;
  }
};
