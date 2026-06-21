const PRODUCTION_API_BASE_URL = 'https://api.chadisho.com/api/';

export function getApiBaseUrl(): string {
  return process.env.API_URL?.trim() || PRODUCTION_API_BASE_URL;
}

export function getApiToken(): string {
  return process.env.API_TOKEN?.trim() || '';
}

export function hasServerApiToken(): boolean {
  return getApiToken().length > 0;
}
