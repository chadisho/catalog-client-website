const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '';
const API_TOKEN = process.env.API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN || '';

export function buildApiUrl(pathname: string, search = ''): string {
  const normalizedBase = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const normalizedPath = pathname.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}${search}`;
}

export function buildApiHeaders(authToken?: string): Headers {
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');

  if (API_TOKEN) {
    headers.set('apiToken', API_TOKEN);
  }

  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  return headers;
}
