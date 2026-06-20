const PRODUCTION_API_BASE_URL = 'https://api.chadisho.com/api/';

export function getApiBaseUrl(): string {
  const configured =
    process.env.API_URL?.trim() || process.env.NEXT_PUBLIC_API_URL?.trim();

  return configured || PRODUCTION_API_BASE_URL;
}

export function getApiToken(): string {
  return (
    process.env.API_TOKEN?.trim() ||
    process.env.NEXT_PUBLIC_API_TOKEN?.trim() ||
    ''
  );
}
