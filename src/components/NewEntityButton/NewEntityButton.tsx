import Link from 'next/link';
import { HiOutlineUserPlus } from 'react-icons/hi2';

import { Button } from '@mantine/core';

interface NewEntityButtonProps {
  href: string;
  text: string;
}

export default function NewEntityButton({ href, text }: NewEntityButtonProps) {
  return (
    <Button
      component={Link}
      href={href}
      size="xs"
      variant="outline"
      leftSection={<HiOutlineUserPlus />}
    >
      {text}
    </Button>
  );
}
