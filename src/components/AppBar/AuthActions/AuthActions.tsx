import Link from 'next/link';
import { HiArrowRightEndOnRectangle, HiOutlineUserPlus } from 'react-icons/hi2';

import { Button, Group } from '@mantine/core';

export default function AuthActions() {
  return (
    <Group>
      <Button
        variant="default"
        component={Link}
        href="/sign-up"
        leftSection={<HiOutlineUserPlus />}
      >
        Sign Up
      </Button>
      <Button
        variant="outline"
        component={Link}
        href="/sign-in"
        leftSection={<HiArrowRightEndOnRectangle />}
      >
        Sign In
      </Button>
    </Group>
  );
}
