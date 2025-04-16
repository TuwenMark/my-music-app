import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // 1. Intercept requests and refresh netease cloud music cookie
  // console.log(`${req.nextUrl.origin}/api/refresh`);
  // const result = await fetch(`${req.nextUrl.origin}/api/refresh`, {
  //   method: 'GET',
  //   headers: req.headers,
  //   credentials: 'include',
  // });
  // if (!result.ok) {
  //   // console.log(result.text());
  //   // const data = await result.json();
  //   // toast.error(data.error || 'Refresh cookie failed!');
  // }
  // 2. Response
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  return res;
}
