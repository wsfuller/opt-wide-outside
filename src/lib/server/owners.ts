import { createClient } from '@/lib/utils/supabase-client';
import type { Owner } from '@/lib/types';

export async function getAll(): Promise<Owner[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('owners')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}

export async function create(owner: Omit<Owner, 'id'>): Promise<Owner> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('owners')
    .insert(owner)
    .select()
    .single();

  if (error) throw error;

  return data;
}
