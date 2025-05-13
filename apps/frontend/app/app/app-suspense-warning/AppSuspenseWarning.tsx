import type { FC } from 'react';

let suspenseFired = false;

export const AppSuspenseWarning: FC = () => {
  if (!suspenseFired) {
    console.warn('Application Suspense rendering');
    suspenseFired = true;
  }

  return null;
};
