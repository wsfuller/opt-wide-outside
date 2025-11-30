'use client';
import Link from 'next/link';
import Image from 'next/image';

import { Burger, Flex, Skeleton, Title } from '@mantine/core';

import useSession from '@/lib/hooks/useSession';
import UserMenu from './UserMenu';
import AuthActions from './AuthActions';

interface AppBarProps {
  opened?: boolean;
  toggle?: () => void;
}

export default function AppBar({ opened, toggle }: AppBarProps) {
  const { session, loading } = useSession();

  return (
    <Flex h="100%" align="center" justify="space-between" p="md">
      <Flex align="center">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Flex align="center" component={Link} href="/">
          <Image src="/toilet.svg" alt="Logo" width={45} height={45} />
          <Title order={4}>Opt Wide Outside FF</Title>
        </Flex>
      </Flex>

      {loading ? (
        <Skeleton height={30} width={100} />
      ) : session ? (
        <UserMenu />
      ) : (
        <AuthActions />
      )}
    </Flex>
  );
}
