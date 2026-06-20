import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const INDEX_DOCUMENT_PATHS = new Set(['/index.html', '/index.htm']);

function rewriteDynamicPublicRoute(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  if (pathname.endsWith('/view')) {
    return null;
  }

  const catalogMatch = pathname.match(/^\/catalog\/([^/]+)\/(.+)$/);
  if (catalogMatch) {
    const url = request.nextUrl.clone();
    url.pathname = '/catalog/view';
    url.searchParams.set('catalogCode', catalogMatch[1]);
    url.searchParams.set('catalogTitle', catalogMatch[2]);
    return NextResponse.rewrite(url);
  }

  const productMatch = pathname.match(/^\/product\/([^/]+)\/(.+)$/);
  if (productMatch) {
    const url = request.nextUrl.clone();
    url.pathname = '/product/view';
    url.searchParams.set('productCode', productMatch[1]);
    url.searchParams.set('productTitle', productMatch[2]);
    return NextResponse.rewrite(url);
  }

  const shopMatch = pathname.match(/^\/shop\/([^/]+)$/);
  if (shopMatch) {
    const url = request.nextUrl.clone();
    url.pathname = '/shop/view';
    url.searchParams.set('shopUsername', shopMatch[1]);
    return NextResponse.rewrite(url);
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (INDEX_DOCUMENT_PATHS.has(pathname)) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  const dynamicRewrite = rewriteDynamicPublicRoute(request);
  if (dynamicRewrite) {
    return dynamicRewrite;
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-forced-locale', 'en');
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/index.html',
    '/index.htm',
    '/en',
    '/en/:path*',
    '/catalog/:path*',
    '/product/:path*',
    '/shop/:path*',
  ],
};
