export const getCookieFromHeader = (cookieString: string, name: string): string | null => {
  const value = `; ${cookieString}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookiePart = parts.pop()?.split(';').shift();
    return cookiePart ? decodeURIComponent(cookiePart) : null;
  }

  return null;
};

export interface SetCookieOptions {
  daysToExpire?: number;
  httpOnly?: boolean;
  path?: string;
  sameSite?: 'Lax';
  secure?: boolean;
}

export const makeSetCookieHeader = (
  name: string,
  value: string,
  options: SetCookieOptions = {},
) => {
  const {
    daysToExpire = 7,
    path = '/',
    httpOnly = false,
    secure = false,
    sameSite = 'Lax',
  } = options;

  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = daysToExpire ? expiresDate.toUTCString() : '';

  return (
    `${name}=${encodeURIComponent(value)};expires=${expires};path=${path}` +
    `${httpOnly ? ';HttpOnly' : ''}${secure ? ';Secure' : ''};SameSite=${sameSite}`
  );
};
