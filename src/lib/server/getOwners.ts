import { createClient } from '@/lib/utils/supabase-client';

async function getOwners() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('owners')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}

export default getOwners;
