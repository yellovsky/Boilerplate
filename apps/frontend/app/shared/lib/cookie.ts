interface GetSetCookieHeaderOptions {
  daysToExpire?: number;
  httpOnly?: boolean;
  path?: string;
  sameSite?: 'Lax';
  secure?: boolean;
}

export const getSetCookieHeader = (name: string, value: string, options: GetSetCookieHeaderOptions = {}) => {
  const { daysToExpire = 7, path = '/', httpOnly = false, secure = false, sameSite = 'Lax' } = options;

  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = daysToExpire ? expiresDate.toUTCString() : '';

  return (
    `${name}=${encodeURIComponent(value)};expires=${expires};path=${path}` +
    `${httpOnly ? ';HttpOnly' : ''}${secure ? ';Secure' : ''};SameSite=${sameSite}`
  );
};
