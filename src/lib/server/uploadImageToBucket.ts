import { createClient } from '@/lib/utils/supabase-client';

export enum BUCKETS {
  OWNER_TEAM_IMAGES = 'owner-team-images',
  NFL_PLAYER_IMAGES = 'nfl-player-images',
}

export async function uploadImage(
  file: File,
  bucket: BUCKETS,
): Promise<string | null> {
  console.log('Uploading image to bucket:', bucket);
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${bucket}/${fileName}`;

    const supabase = await createClient();
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}
