import { redirect } from 'next/navigation';

import { createClient } from '@/lib/utils/supabase-server';

import { SignIn as SignInForm } from '@/components/Forms';

export default async function SignIn() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/app');
  }

  return <SignInForm />;
}
