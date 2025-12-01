'use client';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/utils/supabase-client';
import { HiArrowRightOnRectangle, HiOutlineUser } from 'react-icons/hi2';

import { Avatar, Menu, UnstyledButton } from '@mantine/core';

type UserMenuProps = {
  initialName?: string; // optional fallback from server
};

export default function UserMenu({ initialName }: UserMenuProps) {
  // const session stuff
  const [fullName, setFullName] = useState(initialName ?? '');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const name =
          user.user_metadata?.full_name ??
          ([user.user_metadata?.firstName, user.user_metadata?.lastName]
            .filter(Boolean)
            .join(' ') ||
            user.email);
        setFullName(name);

        // optional: listen for auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
          const updatedUser = session?.user;
          if (!updatedUser) return setFullName('');
          const nextName =
            updatedUser.user_metadata?.full_name ??
            ([
              updatedUser.user_metadata?.firstName,
              updatedUser.user_metadata?.lastName,
            ]
              .filter(Boolean)
              .join(' ') ||
              updatedUser.email);
          setFullName(nextName);
        });
      }
    };

    fetchUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/sign-in');
    router.refresh();
  };

  return (
    <Menu
      shadow="md"
      position="bottom-end"
      transitionProps={{ transition: 'fade' }}
    >
      <Menu.Target>
        <UnstyledButton>
          <Avatar
            src="https://avatars.githubusercontent.com/u/123456789?v=4"
            radius="xl"
            size="sm"
          />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item leftSection={<HiOutlineUser />}>{fullName}</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leftSection={<HiArrowRightOnRectangle />}
          onClick={handleLogout}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
