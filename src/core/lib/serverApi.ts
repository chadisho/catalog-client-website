import { getApiBaseUrl, getApiToken } from '../config/apiEnv';

export function buildApiUrl(pathname: string, search = ''): string {
  const API_BASE_URL = getApiBaseUrl();
  const normalizedBase = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const normalizedPath = pathname.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}${search}`;
}

export function buildApiHeaders(authToken?: string): Headers {
  const headers = new Headers();
  const API_TOKEN = getApiToken();

  headers.set('Content-Type', 'application/json');

  if (API_TOKEN) {
    headers.set('apiKey', API_TOKEN);
  }

  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  return headers;
}
