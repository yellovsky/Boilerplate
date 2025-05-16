import {
  Link as ReactRouterLink,
  type LinkProps as ReactRouterLinkProps,
  NavLink as ReactRouterNavLink,
  type NavLinkProps as ReactRouterNavLinkProps,
} from 'react-router';

import type { Locale } from '@shared/config';

import { useEnhancedTo } from './use-enhanced-to';

interface LinkProps extends ReactRouterLinkProps {
  language?: Locale;
}

export const Link = ({ prefetch = 'intent', viewTransition = true, to, language, ...props }: LinkProps) => {
  const enhancedTo = useEnhancedTo({ language, to });

  return <ReactRouterLink {...props} prefetch={prefetch} to={enhancedTo} viewTransition={viewTransition} />;
};

interface NavLinkProps extends ReactRouterNavLinkProps {
  language?: Locale;
}

export const NavLink = ({ prefetch = 'intent', viewTransition = true, to, language, ...props }: NavLinkProps) => {
  const enhancedTo = useEnhancedTo({ language, to });
  return <ReactRouterNavLink {...props} prefetch={prefetch} to={enhancedTo} viewTransition={viewTransition} />;
};
