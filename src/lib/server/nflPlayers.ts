import { createClient } from '@/lib/utils/supabase-client';
import { NFLPlayer } from '@/lib/types';

import type PaginatedResult from '@/lib/types/pagination';

export async function getAll(): Promise<NFLPlayer[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('nfl_players')
    .select('*')
    .order('last_name', { ascending: true });

  if (error) throw error;

  return data;
}

const ITEMS_PER_PAGE = 10;

export async function getPaginated(
  page: number = 1,
  limit: number = ITEMS_PER_PAGE,
): Promise<PaginatedResult<NFLPlayer>> {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { count, error: countError } = await supabase
    .from('nfl_players')
    .select('count', { count: 'exact', head: true });

  if (countError) throw countError;

  const { data, error } = await supabase
    .from('nfl_players')
    .select('*')
    .order('last_name', { ascending: true })
    .range(from, to);

  if (error) throw error;

  return {
    data: data || [],
    total: count || 0,
  };
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

export async function checkDuplicate(
  first_name: string,
  last_name: string,
  nfl_team_id: string,
): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('nfl_players')
    .select('id')
    .eq('first_name', first_name)
    .eq('last_name', last_name)
    .eq('nfl_team_id', nfl_team_id)
    .limit(1);

  if (error) throw error;

  return data && data.length > 0;
}

export async function create(
  player: Omit<NFLPlayer, 'id'>,
): Promise<NFLPlayer> {
  const supabase = await createClient();

  const isDuplicate = await checkDuplicate(
    player.first_name,
    player.last_name,
    player.nfl_team_id,
  );

  console.log('isDuplicate', isDuplicate);

  if (isDuplicate) {
    throw new Error(
      `Player ${player.first_name} ${player.last_name} already exists on this team`,
    );
  }

  const { data, error } = await supabase
    .from('nfl_players')
    .insert(player)
    .select()
    .single();

  if (error) throw error;

  return data;
}
