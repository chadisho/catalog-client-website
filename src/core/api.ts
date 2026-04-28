/**
 * Centralized API Client
 * Handles all HTTP requests with automatic apiToken + bearer token injection
 */

import { parseUnknownResponseBody } from './lib/http';

const API_BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '';
const API_TOKEN =
  process.env.API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN || '';

const INTERNAL_PROXY_BASE = '/api/proxy';

function extractValidationErrorsMessage(data: unknown): string | null {
  if (typeof data !== 'object' || data === null || !('errors' in data)) {
    return null;
  }

  const errors = data.errors;

  if (!Array.isArray(errors)) {
    return null;
  }

  const messages = errors
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return messages.length > 0 ? messages.join(' | ') : null;
}

/**
 * Central API client with automatic header injection
 * @param endpoint - API endpoint (relative path)
 * @param options - Fetch options (method, body, etc.)
 * @returns Promise with response data
 */
export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const normalizedEndpoint = endpoint.replace(/^\/+/, '');
  const isServer = typeof window === 'undefined';

  const url = isServer
    ? `${API_BASE_URL}${normalizedEndpoint}`
    : `${INTERNAL_PROXY_BASE}/${normalizedEndpoint}`;

  const headers = new Headers(options.headers ?? {});

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (isServer && API_TOKEN && !headers.has('apiToken')) {
    headers.set('apiToken', API_TOKEN);
  }

  if (isServer) {
    const { cookies } = await import('next/headers');
    const { AUTH_TOKEN_COOKIE_KEY } = await import('./constants/auth');

    const cookieStore = await cookies();
    const authToken = cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value;

    if (authToken && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }
  }


  try {
    const response = await fetch(url, {
      cache: 'no-store',
      credentials: 'include',
      ...options,
      headers,
    });

    const data = await parseUnknownResponseBody(response);

    if (!response.ok) {
      let message =
        typeof data === 'object' && data && 'message' in data && typeof data.message === 'string'
          ? data.message
          : `HTTP ${response.status}`;

        const validationMessage = extractValidationErrorsMessage(data);
        if (validationMessage) {
          message = validationMessage;
        
      }

      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
