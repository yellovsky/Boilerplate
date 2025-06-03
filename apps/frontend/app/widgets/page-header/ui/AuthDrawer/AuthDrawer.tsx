import type { FC } from 'react';

import { type AuthStep, ForgotPasswordForm, SignInForm, SignUpForm } from '@features/auth';

interface SignInDrawerContentProps {
  step: AuthStep;
  onSelectStep: (step: AuthStep | null) => void;
}

export const AuthDrawer: FC<SignInDrawerContentProps> = (props) => {
  switch (props.step) {
    case 'sign-in':
      return (
        <SignInForm
          onForgotPassword={() => props.onSelectStep('forgot-password')}
          onSignUpClick={() => props.onSelectStep('sign-up')}
          onSuccess={() => props.onSelectStep(null)}
        />
      );

    case 'sign-up':
      return (
        <SignUpForm onSignInClick={() => props.onSelectStep('sign-in')} onSuccess={() => props.onSelectStep(null)} />
      );

    case 'forgot-password':
      return <ForgotPasswordForm onBackToSignIn={() => props.onSelectStep('sign-in')} />;
    default:
      return null;
  }
};
