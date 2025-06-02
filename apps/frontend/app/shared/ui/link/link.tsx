import { Anchor, type AnchorProps, type ElementProps } from '@mantine/core';
import { Link as ReactRouterLink } from 'react-router';

import type { Locale } from '@shared/config';

import { useEnhancedTo } from './use-enhanced-to';

interface LinkProps extends AnchorProps, ElementProps<typeof ReactRouterLink, keyof AnchorProps> {
  language?: Locale;
}

export const Link = ({ prefetch = 'intent', viewTransition = false, to, language, ...props }: LinkProps) => {
  const enhancedTo = useEnhancedTo({ language, to });

  return (
    <Anchor
      component={ReactRouterLink}
      {...props}
      prefetch={prefetch}
      to={enhancedTo}
      viewTransition={viewTransition}
    />
  );
};
