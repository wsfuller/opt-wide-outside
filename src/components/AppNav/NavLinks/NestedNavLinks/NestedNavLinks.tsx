import { useState } from 'react';
import Link from 'next/link';
import { HiChevronRight, HiOutlineLockClosed } from 'react-icons/hi2';
import cx from 'clsx';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
// import { useSession } from 'next-auth/react';

import { Roles } from '@/lib/types';

import {
  Box,
  // Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
} from '@mantine/core';

import type { NavLinks } from '../links';
import classes from './nested-nav-links.module.css';

/** Group of nested links in a collapsible container */
function NestedNavLinks({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: NavLinks) {
  // const { data: session } = useSession();
  const session = {
    user: {
      roles: Roles.Admin,
    },
  };
  // const router = useRouter();
  const currentPathname = usePathname();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => {
    const isUserDenied =
      (link.minimumAccessLevel &&
        session?.user?.roles < link.minimumAccessLevel) ||
      false;

    return (
      <Box
        key={link.label}
        component={Link}
        href={link.pathname}
        className={cx('app-nav-link', classes.childLink, {
          active: currentPathname.includes(link.pathname),
        })}
        // style={{
        //   display: 'flex',
        //   alignItems: 'center',
        //   width: '100%',
        //   padding: 'var(--mantine-spacing-xs)',
        //   borderRadius: 'var(--mantine-radius-sm)',
        //   transition: 'background-color 0.2s ease',
        // }}
        // onMouseEnter={(e) => {
        //   e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-8)';
        // }}
        // onMouseLeave={(e) => {
        //   e.currentTarget.style.backgroundColor = 'transparent';
        // }}
        data-disabled={isUserDenied}
      >
        <Text mr="xs" size="sm">
          {link.label}
        </Text>
        {isUserDenied && (
          <Box pos="relative" top={1} display="inline-block">
            <HiOutlineLockClosed />
          </Box>
        )}
      </Box>
    );
  });

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        // className={classes.parentLink}
        style={{
          width: '100%',
          padding: 'var(--mantine-spacing-xs)',
          paddingLeft: 0,
          borderRadius: 'var(--mantine-radius-sm)',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Group justify="space-between" gap={0} px="xs">
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <HiChevronRight
              className={cx(classes.chevron, { [classes.chevronOpen]: opened })}
            />
          )}
        </Group>
      </UnstyledButton>
      {/* TODO: Revert back to Collapse component once Mantine fixes the inert prop warning https://github.com/mantinedev/mantine/issues/7864 */}
      {hasLinks && opened && <div>{items}</div>}
    </>
  );
}

export default NestedNavLinks;
