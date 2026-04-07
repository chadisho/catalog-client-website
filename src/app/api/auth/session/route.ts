import { NextResponse } from 'next/server';
import { hasAuthCookie } from '../_lib';

export async function GET() {
  const isAuthenticated = await hasAuthCookie();

  return NextResponse.json({ isAuthenticated });
}
