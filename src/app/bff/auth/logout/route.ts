import { NextResponse } from 'next/server';
import { clearAuthCookie } from '../_lib';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST() {
  await clearAuthCookie();

  return NextResponse.json({ success: true });
}
