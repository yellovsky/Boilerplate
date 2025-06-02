import { Box, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { type ComponentProps, type FC, useMemo } from 'react';
import { type PathPattern, useMatch, useSearchParams } from 'react-router';

import { Link } from '@shared/ui/link';

import { ColorSchemeSwitcher } from '@features/theme';

import { HeaderAuth } from './header-auth';
import { LanguageSwitcherDesktop } from './language-switcher';
import { Logo } from './logo';
import styles from './page-header.module.css';
import { SignInDrawerContent } from './sign-in-drawer-content';

const AUTH_SEARCH_PARAMS = ['sign-in', 'sign-up'] as const;
type AuthSearchParams = (typeof AUTH_SEARCH_PARAMS)[number];
const isAuthSearchParams = (val: string | null): val is AuthSearchParams => AUTH_SEARCH_PARAMS.some((v) => v === val);

const useAuthSearchParams = (): {
  auth: AuthSearchParams | null;
  open: (state: AuthSearchParams) => void;
  close: () => void;
} => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchAuth = searchParams.get('auth');
  const auth = isAuthSearchParams(searchAuth) ? searchAuth : null;

  return useMemo(
    () => ({
      auth,
      close: () =>
        setSearchParams((prev) => {
          prev.delete('auth');
          return prev;
        }),
      open: (state) =>
        setSearchParams((prev) => {
          prev.set('auth', state);
          return prev;
        }),
    }),
    [auth, setSearchParams]
  );
};

const DesktopNavItem: FC<ComponentProps<typeof Link>> = (props) => {
  const pathname = typeof props.to === 'string' ? props.to : props.to.pathname;
  const pathPattern: PathPattern<string> =
    pathname === '/' ? { end: true, path: '/:locale' } : { path: `/:locale${pathname}/*` };

  const active = !!useMatch(pathPattern);

  return <Link {...props} c="bg" underline={active ? 'always' : 'hover'} />;
};

export const PageHeader: FC = () => {
  const [menuOpened, { close: closeMenu, open: openMenu }] = useDisclosure();
  const { auth, close: closeAuth, open: openAuth } = useAuthSearchParams();

  const openSignIn = () => openAuth('sign-in');

  return (
    <Box className={styles.pageHeader} p="md">
      <Burger aria-label="Toggle navigation" hiddenFrom="sm" onClick={openMenu} />
      <Logo />
      <nav className={styles.nav}>
        <DesktopNavItem to="/">Home</DesktopNavItem>
        <DesktopNavItem to="/workouts">Workouts</DesktopNavItem>
      </nav>
      <ColorSchemeSwitcher />
      <LanguageSwitcherDesktop />
      <div>
        <HeaderAuth onSignIn={openSignIn} />
      </div>

      <Drawer onClose={closeMenu} opened={menuOpened} position="left">
        menu
      </Drawer>

      <Drawer classNames={{ body: 'h-full' }} onClose={closeAuth} opened={!!auth} position="right">
        <SignInDrawerContent />
      </Drawer>
    </Box>
  );
};
