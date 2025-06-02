import { Button } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsAuthorized } from '@features/auth';

type HeaderAuthProps = {
  onSignIn: () => void;
};

export const HeaderAuth: FC<HeaderAuthProps> = ({ onSignIn }) => {
  const { isAuthorized, status } = useIsAuthorized();
  const { t: tAuth } = useTranslation('auth');

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return null;

  return isAuthorized ? (
    <Button type="button" variant="outline">
      {tAuth('sign_out_menu_item.text')}
    </Button>
  ) : (
    <Button onClick={onSignIn} type="button" variant="filled">
      {tAuth('sign_in_menu_item.text')}
    </Button>
  );
};
