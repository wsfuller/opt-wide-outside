// 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cx from 'clsx';
import { FiLock } from 'react-icons/fi';

import { Box, ThemeIcon, UnstyledButton, rem } from '@mantine/core';

import type { NavLinks } from '../links';

/** Top level link with no nested links */
function NavLink({ icon: Icon, label, pathname, disabled }: NavLinks) {
  const currentPathname = usePathname();

  return (
    <UnstyledButton
      key={label}
      href={pathname}
      className={cx({
        active: currentPathname === pathname,
      })}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: 'var(--mantine-spacing-xs)',
        borderRadius: 'var(--mantine-radius-sm)',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      component={Link}
      data-disabled={disabled}
    >
      <ThemeIcon
        variant={`${disabled ? 'outline' : 'light'}`}
        // color={`${disabled && 'gray'}`}
        size={30}
      >
        <Icon style={{ width: rem(18), height: rem(18) }} />
      </ThemeIcon>

      <Box ml="md" mr="xs">
        {label}
      </Box>
      {disabled && <FiLock />}
    </UnstyledButton>
  );
}

export default NavLink;
