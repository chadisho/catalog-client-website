import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const INDEX_DOCUMENT_PATHS = new Set(['/index.html', '/index.htm']);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ArvanCloud (and similar CDNs) may rewrite "/" to "/index.html" before proxying to Next.js.
  if (INDEX_DOCUMENT_PATHS.has(pathname)) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-forced-locale', 'en');
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/index.html', '/index.htm', '/en', '/en/:path*'],
};
