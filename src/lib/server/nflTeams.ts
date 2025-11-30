import { createClient } from '@/lib/utils/supabase-client';
import type { NFLTeam } from '@/lib/types';

export async function getAll(): Promise<NFLTeam[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('nfl_teams')
    .select('*')
    .order('team_name', { ascending: true });

  if (error) throw error;

  return data;
}

export async function getById(id: string): Promise<NFLTeam | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('nfl_teams')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}

export async function create(
  team: Omit<NFLTeam, 'id' | 'created_at'>,
): Promise<NFLTeam> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('nfl_teams')
    .insert(team)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function update(
  id: string,
  team: Omit<NFLTeam, 'id' | 'created_at'>,
): Promise<NFLTeam> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('nfl_teams')
    .update(team)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
