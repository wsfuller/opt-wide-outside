import { createClient } from '@/lib/utils/supabase-client';
import { NFLPlayer } from '@/lib/types';

export async function getAll(): Promise<NFLPlayer[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('nfl_players')
    .select('*')
    .order('last_name', { ascending: true });

  if (error) throw error;

  return data;
}

export async function getById(id: string): Promise<NFLPlayer | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('nfl_players')
    .select('*')
    .eq('id', id);

  console.log('data', data);
  console.log('error', error);

  if (error) throw error;

  return data && data.length > 0 ? data[0] : null;
}
