import { getApiBaseUrl, getApiToken, hasServerApiToken } from '../config/apiEnv';

export function buildApiUrl(pathname: string, search = ''): string {
  const API_BASE_URL = getApiBaseUrl();
  const normalizedBase = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const normalizedPath = pathname.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}${search}`;
}

export function applyUpstreamApiCredentials(headers: Headers): void {
  const apiToken = getApiToken();

  if (!apiToken) {
    return;
  }

  headers.set('apiKey', apiToken);

  // Some upstream endpoints still accept this legacy header name.
  if (!headers.has('apiToken')) {
    headers.set('apiToken', apiToken);
  }
}

export function buildApiHeaders(authToken?: string): Headers {
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  applyUpstreamApiCredentials(headers);

  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  return headers;
}

export async function requestUpstreamPost(
  path: string,
  searchParams: URLSearchParams,
  authToken?: string
): Promise<Response> {
  if (!hasServerApiToken()) {
    console.error('[upstream] Missing API_TOKEN in server environment');
    return new Response(
      JSON.stringify({ message: 'service_configuration_error' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return fetch(buildApiUrl(path, `?${searchParams.toString()}`), {
    method: 'POST',
    headers: buildApiHeaders(authToken),
    cache: 'no-store',
  });
}
