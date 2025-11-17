'use client';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import AppBar from '@/components/AppBar';
import AppNav from '@/components/AppNav';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <AppBar opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <AppNav />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default AdminLayout;
