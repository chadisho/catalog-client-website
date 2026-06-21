const PRODUCTION_API_BASE_URL = 'https://api.chadisho.com/api/';

export function getApiBaseUrl(): string {
  const configured =
    process.env.API_URL?.trim() || process.env.NEXT_PUBLIC_API_URL?.trim();

  return configured || PRODUCTION_API_BASE_URL;
}

/**
 * Server-only API token. Never read from client bundles.
 * Set API_TOKEN in the server environment for production.
 */
export function getServerApiToken(): string {
  return process.env.API_TOKEN?.trim() || '';
}

/**
 * Token for server-side upstream requests (auth routes, proxy, SSR).
 * Production must set API_TOKEN on the server — never use NEXT_PUBLIC_* there.
 */
export function getApiToken(): string {
  const serverToken = getServerApiToken();
  if (serverToken) {
    return serverToken;
  }

  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_API_TOKEN?.trim() || '';
  }

  return '';
}

export function hasServerApiToken(): boolean {
  return getServerApiToken().length > 0;
}
