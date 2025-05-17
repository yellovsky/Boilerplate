import { cx } from 'class-variance-authority';
import type { FC } from 'react';

import { NavLink } from '@shared/ui/link';

import { LanguageSwitcher } from '@features/language-switcher';
import { ColorSchemeSwitcher } from '@features/theme';

import { HeaderAuth } from './header-auth';
import styles from './page-header.module.css';

interface PageHeaderProps {
  className?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ className }) => {
  return (
    <div className={cx(className, styles.pageHeader)}>
      <div>logo</div>
      <div className={styles.nav}>
        <NavLink
          end
          viewTransition={false}
          to="/"
          className={({ isActive, isPending }) => (isPending ? 'text-fg-disabled' : isActive ? 'text-accent' : '')}
        >
          Home
        </NavLink>

        <NavLink
          viewTransition={false}
          to="/workouts"
          className={({ isActive, isPending }) => (isPending ? 'text-fg-disabled' : isActive ? 'text-accent' : '')}
        >
          Workouts
        </NavLink>
      </div>
      <div>
        <ColorSchemeSwitcher />
      </div>
      <div>
        <LanguageSwitcher />
      </div>
      <div>
        <HeaderAuth />
      </div>
    </div>
  );
};
