import { redirect } from 'next/navigation';

import { createClient } from '@/lib/utils/supabase-server';

import { SignUp as SignUpForm } from '@/components/Forms';

export default async function SignUp() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/app');
  }

  return <SignUpForm />;
}
