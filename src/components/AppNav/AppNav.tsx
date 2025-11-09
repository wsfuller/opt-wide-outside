import { AppShell, ScrollArea, Text } from '@mantine/core';

import NavLinks from './NavLinks';

export default function AppNav() {
  const APP_VERSION = 'v1.0.0';

  return (
    <>
      <AppShell.Section grow my="sm" component={ScrollArea}>
        <NavLinks />
      </AppShell.Section>
      <AppShell.Section
        p="xs"
        style={{
          borderTop: '1px solid var(--mantine-color-dark-4)',
        }}
      >
        <Text size="xs" mt="xs" c="dimmed">
          {APP_VERSION}
        </Text>
      </AppShell.Section>
    </>
  );
}
