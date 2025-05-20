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
          className={({ isActive, isPending }) => (isPending ? 'text-fg-disabled' : isActive ? 'text-accent' : '')}
          end
          to="/"
          viewTransition={false}
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive, isPending }) => (isPending ? 'text-fg-disabled' : isActive ? 'text-accent' : '')}
          to="/workouts"
          viewTransition={false}
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
