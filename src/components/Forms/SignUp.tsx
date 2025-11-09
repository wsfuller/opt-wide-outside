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

export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validate: {
      firstName: (value) =>
        value.length > 0 ? null : 'First name is required',
      lastName: (value) => (value.length > 0 ? null : 'Last name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: form.values.email,
      password: form.values.password,
      options: {
        data: {
          full_name: `${form.values.firstName} ${form.values.lastName}`,
          role: 'user',
        },
      },
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
        message: 'Check your email for verification!',
        color: 'green',
      });
      router.push('/app');
    }

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
        <form onSubmit={handleSignUp} style={{ width: '300px' }}>
          <Flex direction="column" gap="md">
            <Title order={2} ta="center">
              Sign Up
            </Title>
            <TextInput
              withAsterisk
              label="First Name"
              placeholder="First name"
              key={form.key('firstName')}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              withAsterisk
              label="Last Name"
              placeholder="Last name"
              key={form.key('lastName')}
              {...form.getInputProps('lastName')}
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="email@example.com"
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
                Sign Up
              </Button>
            </Flex>
          </Flex>
        </form>
      </Paper>
    </Flex>
  );
}
