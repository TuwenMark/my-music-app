import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import toast from 'react-hot-toast';

export async function middleware(req: NextRequest) {
  // 1. Intercept requests and refresh netease cloud music cookie
  const result = await fetch(`${req.nextUrl.origin}/api/refresh`);
  if (!result.ok) {
    const data = await result.json();
    toast.error(data.error || 'Refresh cookie failed!');
  }
  // 2. Response
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  return res;
}
