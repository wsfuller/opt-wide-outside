import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isAppRoute = pathname.startsWith('/app');

  // Ignore everything else
  if (!isAdminRoute && !isAppRoute) return res;

  // Require a logged-in user for both /admin and /app
  if (!session) {
    const redirectTo = req.nextUrl.clone();
    redirectTo.pathname = '/sign-in';
    redirectTo.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectTo);
  }

  // Admin-only guard
  if (isAdminRoute) {
    const role = session.user.user_metadata?.role;
    if (role !== 'admin') {
      const fallback = req.nextUrl.clone();
      fallback.pathname = '/app';
      fallback.searchParams.delete('redirectTo');
      return NextResponse.redirect(fallback);
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/app/:path*'],
};
