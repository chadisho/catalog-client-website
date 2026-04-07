import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_COOKIE_MAX_AGE_SECONDS, AUTH_TOKEN_COOKIE_KEY } from '../../../core/constants/auth';
import { parseUnknownResponseBody } from '../../../core/lib/http';
import { buildApiHeaders, buildApiUrl } from '../../../core/lib/serverApi';

export async function requestAuthEndpoint(path: string, searchParams: URLSearchParams): Promise<Response> {
  return fetch(buildApiUrl(path, `?${searchParams.toString()}`), {
    method: 'POST',
    headers: buildApiHeaders(),
    cache: 'no-store',
  });
}

export async function parseAuthResponse(response: Response) {
  const payload = await parseUnknownResponseBody(response);

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : `HTTP ${response.status}`;

    return NextResponse.json({ message }, { status: response.status });
  }

  return payload;
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_TOKEN_COOKIE_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_COOKIE_KEY);
}

export async function hasAuthCookie() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value);
}
