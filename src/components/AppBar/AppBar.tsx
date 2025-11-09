import Image from 'next/image';

import { Flex, Title } from '@mantine/core';

import UserMenu from './UserMenu';

export default function AppBar() {
  return (
    <Flex h="100%" align="center" justify="space-between" p="md">
      <Flex align="center">
        <Image src="/toliet.svg" alt="Logo" width={45} height={45} />
        <Title order={4}>Opt Wide Outside FF</Title>
      </Flex>
      <UserMenu />
    </Flex>
  );
}
