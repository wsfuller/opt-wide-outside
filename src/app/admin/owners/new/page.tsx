'use client';

import { useState } from 'react';
import { Button, FileInput, Group, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';

import { supabase } from '@/lib/utils/supabase-client';

export default function OwnersNew() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      teamName: '',
      teamLogo: '',
      isActive: true,
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
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

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `owner-team-logos/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('owner-team-logos') // your bucket name
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('owner-team-logos').getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    setUploading(true);
    let imageUrl: string | null = null;

    // Upload image first if one was selected
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        throw new Error('Failed to upload image');
      }
    }
    try {
      const { firstName, lastName, teamName } = values;

      const { data, error } = await supabase
        .from('owners')
        .insert({
          first_name: firstName,
          last_name: lastName,
          team_name: teamName,
          team_logo_url: imageUrl,
          is_active: true,
        })
        .select();

      if (error) {
        throw error;
      }
      console.log(data);

      notifications.show({
        title: 'Success',
        message: 'Owner added successfully',
        color: 'green',
      });

      form.reset();
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Failed to add Owner',
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="First Name"
        placeholder="Eric"
        key={form.key('firstName')}
        {...form.getInputProps('firstName')}
      />

      <TextInput
        withAsterisk
        label="Last Name"
        placeholder="Tobias"
        key={form.key('lastName')}
        {...form.getInputProps('lastName')}
      />

      <TextInput
        withAsterisk
        label="Team Name"
        placeholder="Hot Chubb Time Machine"
        key={form.key('teamName')}
        {...form.getInputProps('teamName')}
      />

      <FileInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        value={imageFile}
        onChange={handleImageChange}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
