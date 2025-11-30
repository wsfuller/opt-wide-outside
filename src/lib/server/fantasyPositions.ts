import { createClient } from '@/lib/utils/supabase-client';
import { FantasyPosition } from '@/lib/types';

export async function getAll(): Promise<FantasyPosition[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('fantasy_positions')
    .select('*')
    .order('position', { ascending: true });

  if (error) throw error;

  return data;
}
