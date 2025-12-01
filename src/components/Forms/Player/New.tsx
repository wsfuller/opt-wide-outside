'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, FileInput, Group, Select, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';

import { FantasyPosition, NFLTeam } from '@/lib/types';
import { IMAGE_FILES_ACCEPTED } from '@/lib/constants';
import { UploadImageToBucket, NFLPlayers } from '@/lib/server';

interface PlayerNewProps {
  nflTeams: NFLTeam[];
  fantasyPositions: FantasyPosition[];
}

export default function PlayerNew({
  nflTeams,
  fantasyPositions,
}: PlayerNewProps) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { uploadImage, BUCKETS } = UploadImageToBucket;

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

  const handleImageChange = (file: File | null) => {
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    setUploading(true);
    let imageUrl: string | null = null;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile, BUCKETS.NFL_PLAYER_IMAGES);

      if (!imageUrl) {
        setUploading(false);
        notifications.show({
          title: 'Error',
          message: 'Failed to upload image',
          color: 'red',
        });
        return;
      }
    }

    try {
      const { firstName, lastName, nflTeamId, fantasyPositionId } = values;

      await NFLPlayers.create({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        nfl_team_id: nflTeamId,
        fantasy_position_id: fantasyPositionId,
        image_url: imageUrl,
      });

      notifications.show({
        title: 'Success',
        message: 'Player added successfully',
        color: 'green',
      });

      form.reset();
      setImageFile(null);
      setImagePreview(null);
      setUploading(false);
      router.push('/admin/nfl-players');
    } catch (error) {
      console.error('Error adding NFL player:', error);
      setUploading(false);

      const errorMessage =
        error instanceof Error ? error.message : 'Failed to add NFL player';

      notifications.show({
        title: 'Error',
        message: errorMessage,
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
        description={`Accepted file types: ${IMAGE_FILES_ACCEPTED}`}
        accept={IMAGE_FILES_ACCEPTED}
        value={imageFile}
        onChange={handleImageChange}
      />

      <Group justify="flex-end" mt="md">
        <Button
          type="submit"
          disabled={uploading || !form.isTouched()}
          loading={uploading}
        >
          Submit
        </Button>
      </Group>
    </form>
  );
}
