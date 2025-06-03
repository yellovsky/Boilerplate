import { Box, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { ComponentProps, FC } from 'react';
import { type PathPattern, useMatch, useSearchParams } from 'react-router';

import { Link } from '@shared/ui/link';

import { type AuthStep, isAuthStep } from '@features/auth';
import { ColorSchemeSwitcher } from '@features/theme';

import { AuthDrawer } from './AuthDrawer';
import { HeaderAuth } from './HeaderAuth';
import { LanguageSwitcherDesktop } from './LanguageSwitcher';
import { Logo } from './Logo';
import styles from './PageHeader.module.css';

const useAuthStep = (): [step: AuthStep | null, setStep: (step: AuthStep | null) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchAuth = searchParams.get('auth');

  const step = isAuthStep(searchAuth) ? searchAuth : null;
  const setStep = (stepToSet: AuthStep | null) => {
    setSearchParams((prev) => {
      if (stepToSet) prev.set('auth', stepToSet);
      else prev.delete('auth');
      return prev;
    });
  };

  return [step, setStep];
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
  const [step, setStep] = useAuthStep();

  const closeAuth = () => setStep(null);

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
      <HeaderAuth onSelectStep={setStep} />

      <Drawer onClose={closeMenu} opened={menuOpened} position="left">
        menu
      </Drawer>

      <Drawer classNames={{ body: 'h-full' }} onClose={closeAuth} opened={!!step} position="right">
        {!step ? null : <AuthDrawer onSelectStep={setStep} step={step} />}
      </Drawer>
    </Box>
  );
};
