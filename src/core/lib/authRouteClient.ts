/**
 * Browser-safe client for internal auth API routes.
 *
 * Calls same-origin `/api/auth/*` handlers only. The apiKey header is injected
 * server-side when those routes forward to the upstream API — never here.
 */

type AuthRouteFetchOptions = {
  method?: 'GET' | 'POST';
  body?: unknown;
};

export async function fetchAuthRoute(path: string, options: AuthRouteFetchOptions = {}): Promise<Response> {
  const { method = 'POST', body } = options;

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  return fetch(`/api/auth/${path.replace(/^\/+/, '')}`, {
    method,
    headers,
    credentials: 'include',
    cache: 'no-store',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}
