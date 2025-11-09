import { createClient } from '@/lib/utils/supabase-client';

async function getNFLTeams() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('nfl_teams')
    .select('*')
    .order('team_name', { ascending: true });

  if (error) throw error;

  return data;
}

export default getNFLTeams;
