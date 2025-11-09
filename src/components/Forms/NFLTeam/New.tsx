'use client';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/utils/supabase-client';

import { Button, Group, Select, TextInput } from '@mantine/core';

import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';

export default function NFLTeamNew() {
  const router = useRouter();
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      teamName: '',
      city: '',
      conference: '',
      division: '',
      // teamLogo: '',
      abbreviation: '',
    },

    validate: {
      teamName: (value) => (value.length > 0 ? null : 'Team name is required'),
      city: (value) => (value.length > 0 ? null : 'City is required'),
      conference: (value) =>
        value.length > 0 ? null : 'Conference is required',
      division: (value) => (value.length > 0 ? null : 'Division is required'),
      abbreviation: (value) =>
        value.length > 0 ? null : 'Abbreviation is required',
    },
  });
  const divisions = ['North', 'East', 'South', 'West'];

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { teamName, city, conference, division, abbreviation } = values;

      const { data, error } = await createClient()
        .from('nfl_teams')
        .insert({
          team_name: teamName,
          city,
          conference,
          division: `${conference} ${division}`,
          abbreviation,
        })
        .select();

      if (error) {
        throw error;
      }
      console.log(data);

      notifications.show({
        title: 'Success',
        message: 'NFL team added successfully',
        color: 'green',
      });

      form.reset();
      router.push('/admin/nfl-teams');
    } catch (err) {
      console.error('Error adding NFL team:', err);
      const error = err instanceof Error ? err : new Error('Unknown error');

      notifications.show({
        title: 'Error',
        message: `Failed to add NFL team: ${error.message}`,
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group grow gap="md" mb="md">
        <TextInput
          withAsterisk
          label="Team Name"
          placeholder="Bears"
          key={form.key('teamName')}
          {...form.getInputProps('teamName')}
        />
        <TextInput
          withAsterisk
          label="City"
          placeholder="Chicago"
          key={form.key('city')}
          {...form.getInputProps('city')}
        />
        <TextInput
          withAsterisk
          label="Abbreviation"
          placeholder="Chi"
          key={form.key('abbreviation')}
          maxLength={3}
          {...form.getInputProps('abbreviation')}
        />
      </Group>
      <Group grow gap="md" mb="md">
        <Select
          withAsterisk
          label="Conference"
          placeholder="NFC"
          data={['NFC', 'AFC']}
          key={form.key('conference')}
          {...form.getInputProps('conference')}
        />

        <Select
          withAsterisk
          label="Division"
          placeholder="North"
          data={divisions}
          key={form.key('division')}
          {...form.getInputProps('division')}
          disabled={!form.values.conference}
        />
      </Group>

      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={!form.isTouched()}>
          Submit
        </Button>
      </Group>
    </form>
  );
}
