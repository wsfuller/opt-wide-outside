'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase-client';

import {
  Button,
  Flex,
  Paper,
  TextInput,
  Title,
  PasswordInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: form.values.email,
      password: form.values.password,
    });

    if (error) {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    } else {
      notifications.show({
        title: 'Success',
        message: 'Signed in successfully!',
        color: 'green',
      });
    }

    const redirectTo = searchParams.get('redirectTo') || '/app';
    router.replace(redirectTo);
    router.refresh();

    setLoading(false);
  };

  const isSubmitDisabled = loading || !form.isDirty() || !form.isValid();

  return (
    <Flex
      direction="column"
      gap="md"
      h="100vh"
      w="auto"
      justify="center"
      align="center"
    >
      <Paper shadow="xs" withBorder p="xl">
        <form onSubmit={handleSignIn} style={{ width: '300px' }}>
          <Flex direction="column" gap="md">
            <Title order={2} ta="center">
              Sign In
            </Title>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="email@example.com"
              type="email"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <Flex justify="flex-end">
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                loading={loading}
              >
                Sign In
              </Button>
            </Flex>
          </Flex>
        </form>
      </Paper>
    </Flex>
  );
}
