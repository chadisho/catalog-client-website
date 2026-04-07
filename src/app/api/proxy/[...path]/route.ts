import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE_KEY } from '../../../../core/constants/auth';
import { parseUnknownResponseBody } from '../../../../core/lib/http';
import { buildApiHeaders, buildApiUrl } from '../../../../core/lib/serverApi';

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function proxyRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const targetPath = path.join('/');
  const requestUrl = new URL(request.url);
  const cookieStore = await cookies();
  const authToken = cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value;

  const headers = buildApiHeaders(authToken);

  const contentType = request.headers.get('content-type');
  if (contentType) {
    headers.set('Content-Type', contentType);
  }

  const accept = request.headers.get('accept');
  if (accept) {
    headers.set('Accept', accept);
  }

  const method = request.method.toUpperCase();
  const hasBody = !['GET', 'HEAD'].includes(method);

  const upstreamResponse = await fetch(buildApiUrl(targetPath, requestUrl.search), {
    method,
    headers,
    body: hasBody ? await request.text() : undefined,
    cache: 'no-store',
  });

  const payload = await parseUnknownResponseBody(upstreamResponse);

  return NextResponse.json(payload, { status: upstreamResponse.status });
}

export async function GET(request: Request, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PUT(request: Request, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: Request, context: RouteContext) {
  return proxyRequest(request, context);
}
