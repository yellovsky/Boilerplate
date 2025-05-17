import { Outlet } from 'react-router';

import { PageFooter } from '@widgets/page-footer';
import { PageHeader } from '@widgets/page-header';

import styles from './layout.module.css';

export default function HomeLayout() {
  return (
    <div className={styles.layout}>
      <PageHeader className={styles.header} />
      <div className={styles.main}>
        <Outlet />
      </div>
      <PageFooter className={styles.footer} />
    </div>
  );
}
