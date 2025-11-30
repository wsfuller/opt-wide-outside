import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi2';

import { Button } from '@mantine/core';

interface BackButtonProps {
  href: string;
  text: string;
}

export default function BackButton({ href, text }: BackButtonProps) {
  return (
    <Button
      component={Link}
      href={href}
      size="xs"
      variant="outline"
      leftSection={<HiChevronLeft />}
    >
      {text}
    </Button>
  );
}
