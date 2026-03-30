/**
 * Centralized API Client
 * Handles all HTTP requests with automatic apiToken header injection
 */

const API_BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '';
const API_TOKEN =
  process.env.API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN || '';

/**
 * Central API client with automatic header injection
 * @param endpoint - API endpoint (relative path)
 * @param options - Fetch options (method, body, etc.)
 * @returns Promise with response data
 */
export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'apiToken': API_TOKEN,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
      console.log(error);
    throw error;
  }
}
