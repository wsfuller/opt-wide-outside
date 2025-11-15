'use client';
import Image from 'next/image';

import { Flex, Title } from '@mantine/core';

import useSession from '@/lib/hooks/useSession';
import UserMenu from './UserMenu';
import AuthActions from './AuthActions';

export default function AppBar() {
  const { session } = useSession();

  return (
    <Flex h="100%" align="center" justify="space-between" p="md">
      <Flex align="center">
        <Image src="/toliet.svg" alt="Logo" width={45} height={45} />
        <Title order={4}>Opt Wide Outside FF</Title>
      </Flex>
      {session ? <UserMenu /> : <AuthActions />}
    </Flex>
  );
}
