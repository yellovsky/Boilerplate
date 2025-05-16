import type { FC } from 'react';

import { useIsAuthorized } from '@features/auth';

export const HeaderAuth: FC = () => {
  const { isAuthorized, status } = useIsAuthorized();

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return null;

  return isAuthorized ? <button type="button">Logout</button> : <button type="button">Login</button>;
};
