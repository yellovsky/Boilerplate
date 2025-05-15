import { Link as ReactRouterLink, type LinkProps as ReactRouterLinkProps } from 'react-router';

import { Locale } from '@shared/config/locale';

import { useEnhancedTo } from './use-enhanced-to';

export interface LinkProps extends ReactRouterLinkProps {
  language?: Locale;
}

export const Link = ({
  prefetch = 'intent',
  viewTransition = true,
  to,
  language,
  ...props
}: LinkProps) => {
  const enhancedTo = useEnhancedTo({ language, to });

  return (
    <ReactRouterLink
      {...props}
      prefetch={prefetch}
      to={enhancedTo}
      viewTransition={viewTransition}
    />
  );
};
