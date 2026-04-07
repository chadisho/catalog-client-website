import { NextResponse } from 'next/server';
import { clearAuthCookie } from '../_lib';

export async function POST() {
  await clearAuthCookie();

  return NextResponse.json({ success: true });
}
