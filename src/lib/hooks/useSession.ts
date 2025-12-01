'use client';

import { useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { createClient } from '@/lib/utils/supabase-client';

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        setError(null);

        if (session?.user) {
          // Session exists, verify with getUser
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();

          if (!mounted) return;

          if (userError) {
            setError(userError as Error);
            setSession(null);
            setUser(null);
          } else {
            setSession(session);
            setUser(user);
            setError(null);
          }
        } else {
          // No session
          setSession(null);
          setUser(null);
          setError(null);
        }
      } catch (err) {
        if (!mounted) return;
        setError(err as Error);
        setSession(null);
        setUser(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setError(null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { session, user, loading, error };
}
