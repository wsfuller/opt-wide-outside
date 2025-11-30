import Link from 'next/link';

import { Button, Flex } from '@mantine/core';

import PageTitle from '@/components/PageTitle';
import NewEntityButton from '@/components/NewEntityButton';
import BackButton from '@/components/BackButton';

interface AdminPageHeaderProps {
  pageTitle: string;
  newEntityButton?: {
    href: string;
    text: string;
  };
  backButton?: {
    href: string;
    text: string;
  };
}

export default function AdminPageHeader({
  pageTitle,
  newEntityButton,
  backButton,
}: AdminPageHeaderProps) {
  return (
    <Flex gap="md" justify="space-between" align="center" mb="md">
      <PageTitle title={pageTitle} />
      {newEntityButton && (
        <NewEntityButton
          href={newEntityButton.href}
          text={newEntityButton.text}
        />
      )}
      {backButton && (
        <BackButton href={backButton.href} text={backButton.text} />
      )}
    </Flex>
  );
}
