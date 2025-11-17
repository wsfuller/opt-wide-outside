'use client';

import { AppShell } from '@mantine/core';

import AppBar from '@/components/AppBar';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell padding="md" header={{ height: { base: 60, md: 70, lg: 80 } }}>
      <AppShell.Header>
        <AppBar />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;
