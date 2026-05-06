import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/en' || request.nextUrl.pathname.startsWith('/en/')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-forced-locale', 'en');
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/en', '/en/:path*'],
};
