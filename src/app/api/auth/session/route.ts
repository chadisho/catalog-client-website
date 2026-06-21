import { NextResponse } from 'next/server';
import { hasAuthCookie } from '../_lib';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const isAuthenticated = await hasAuthCookie();

  return NextResponse.json({ isAuthenticated });
}
