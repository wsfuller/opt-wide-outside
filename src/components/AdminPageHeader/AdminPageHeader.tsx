import { Flex } from '@mantine/core';

import PageTitle from '@/components/PageTitle';
import NewEntityButton from '@/components/NewEntityButton';

interface AdminPageHeaderProps {
  pageTitle: string;
  newEntityButton?: {
    href: string;
    text: string;
  };
}

export default function AdminPageHeader({
  pageTitle,
  newEntityButton,
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
    </Flex>
  );
}
