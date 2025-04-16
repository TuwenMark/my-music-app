import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import toast from 'react-hot-toast';
import { refreshCookie } from './lib/neteasecloud/loginActions';

export async function middleware(req: NextRequest) {
  // 1. Intercept requests
  const { success, error } = await refreshCookie();
  if (!success) {
    console.log(error);
    return toast.error('Login netease cloud music failed!');
  }
  // 2. Response
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  return res;
}
