import { refreshCookie } from '@/lib/neteasecloud/loginActions';
import { NextResponse } from 'next/server';

export async function GET() {
  const { success, error } = await refreshCookie();
  if (!success) {
    console.log(error);
    return NextResponse.json(
      { error: 'Refresh cookie failed!' },
      { status: 500 },
    );
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
