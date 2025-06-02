import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router';

import { PageHeader } from '@widgets/page-header';

export default function HomeLayout() {
  return (
    <AppShell footer={{ height: 60 }} header={{ height: 72 }} padding="md">
      <AppShell.Header>
        <PageHeader />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
        <AppShell.Footer p="md">footer</AppShell.Footer>
      </AppShell.Main>
    </AppShell>
  );
}
