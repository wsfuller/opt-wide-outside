'use client';

import { Title } from '@mantine/core';

export default function PageTitle({ title }: { title: string }) {
  return <Title order={1}>{title}</Title>;
}
