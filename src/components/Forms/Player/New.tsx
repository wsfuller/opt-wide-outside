'use client';
import { useRouter } from 'next/navigation';

import { Button, FileInput, Group, Select, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';

import { createClient } from '@/lib/utils/supabase-client';
import { FantasyPosition, NFLTeam } from '@/lib/types';
import { IMAGE_FILES_ACCEPTED } from '@/lib/constants';

interface PlayerNewProps {
  nflTeams: NFLTeam[];
  fantasyPositions: FantasyPosition[];
}

export default function PlayerNew({
  nflTeams,
  fantasyPositions,
}: PlayerNewProps) {
  const router = useRouter();
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      nflTeamId: '',
      fantasyPositionId: '',
      imageUrl: '',
    },

    validate: {
      firstName: (value) =>
        value.length > 0 ? null : 'First name is required',
      lastName: (value) => (value.length > 0 ? null : 'Last name is required'),
      nflTeamId: (value) => (value.length > 0 ? null : 'NFL Team is required'),
      fantasyPositionId: (value) =>
        value.length > 0 ? null : 'Position is required',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { firstName, lastName, nflTeamId, fantasyPositionId, imageUrl } =
        values;

      const { error } = await createClient()
        .from('nfl_players')
        .insert({
          first_name: firstName,
          last_name: lastName,
          nfl_team_id: nflTeamId,
          fantasy_position_id: fantasyPositionId,
          image_url: imageUrl,
        })
        .select();

      if (error) {
        throw error;
      }

      notifications.show({
        title: 'Success',
        message: 'Player added successfully',
        color: 'green',
      });

      form.reset();
      router.push('/admin/nfl-players');
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
          label="First Name"
          placeholder="John"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="Smith"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
      </Group>
      <Group grow gap="md" mb="md">
        {/* NFL Team */}
        <Select
          withAsterisk
          label="NFL Team"
          key={form.key('nflTeamId')}
          searchable
          clearable
          {...form.getInputProps('nflTeamId')}
          data={nflTeams.map((team) => ({
            value: team.id.toString(),
            label: team.team_name,
          }))}
        />
        {/* Position */}
        <Select
          withAsterisk
          label="Position"
          key={form.key('fantasyPositionId')}
          searchable
          clearable
          {...form.getInputProps('fantasyPositionId')}
          data={fantasyPositions.map((position) => ({
            value: position.id.toString(),
            label: position.position,
          }))}
        />
      </Group>

      <FileInput
        label="Upload Player Image"
        accept={IMAGE_FILES_ACCEPTED}
        description="Upload a PNG, JPEG, JPG, or WebP image for the player"
        key={form.key('imageUrl')}
        value={imageFile}
        onChange={handleImageChange}
        {...form.getInputProps('imageUrl')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={!form.isTouched()}>
          Submit
        </Button>
      </Group>
    </form>
  );
}
