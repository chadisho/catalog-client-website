const PRODUCTION_API_BASE_URL = 'https://api.chadisho.com/api/';

function readEnv(name: 'API_URL' | 'API_TOKEN'): string {
  // Bracket access keeps env vars runtime-readable on the server after deploy.
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

export function getApiBaseUrl(): string {
  return readEnv('API_URL') || PRODUCTION_API_BASE_URL;
}

export function getApiToken(): string {
  return readEnv('API_TOKEN');
}

export function hasServerApiToken(): boolean {
  return getApiToken().length > 0;
}
