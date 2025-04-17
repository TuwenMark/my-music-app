import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // TODO: 1. Intercept requests and refresh netease cloud music cookie

  // 2. Response
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  return res;
}
