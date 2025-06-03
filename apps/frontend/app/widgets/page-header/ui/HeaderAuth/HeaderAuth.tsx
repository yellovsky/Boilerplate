import { Button } from '@mantine/core';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { type AuthStep, useIsAuthorized } from '@features/auth';
import { signOutMutationAtom } from '@features/auth/model/sign-out-atom';

type HeaderAuthProps = {
  onSelectStep: (step: AuthStep | null) => void;
};

export const HeaderAuth: FC<HeaderAuthProps> = ({ onSelectStep }) => {
  const signOutMutation = useAtomValue(signOutMutationAtom);
  const { isAuthorized, status } = useIsAuthorized();
  const { t: tAuth } = useTranslation('auth');

  const onSignIn = () => onSelectStep('sign-in');
  const onSignUp = () => onSelectStep('sign-up');

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return null;

  return isAuthorized ? (
    <Button
      loading={signOutMutation.isPending}
      onClick={() => signOutMutation.mutate()}
      type="button"
      variant="outline"
    >
      {tAuth('sign_out_menu_item.text')}
    </Button>
  ) : (
    <>
      <Button onClick={onSignUp} type="button" variant="outline">
        {tAuth('sign_up_menu_item.text')}
      </Button>
      <Button onClick={onSignIn} type="button" variant="filled">
        {tAuth('sign_in_menu_item.text')}
      </Button>
    </>
  );
};
