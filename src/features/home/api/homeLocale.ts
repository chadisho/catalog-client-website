import { headers } from 'next/headers';
import { LOCALE_COOKIE_KEY, resolveAppLocale, type AppLocale } from '../../../core/i18n/globalLocale';

function extractCookieValue(cookieHeader: string | null, key: string): string | undefined {
  if (!cookieHeader) {
    return undefined;
  }

  const matchedCookie = cookieHeader
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${key}=`));

  if (!matchedCookie) {
    return undefined;
  }

  return decodeURIComponent(matchedCookie.slice(key.length + 1));
}

export async function resolveHomeLocale(): Promise<AppLocale> {
  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get('cookie');
  const acceptLanguage = requestHeaders.get('accept-language');

  const localeFromCookie = resolveAppLocale(extractCookieValue(cookieHeader, LOCALE_COOKIE_KEY));

  if (localeFromCookie) {
    return localeFromCookie;
  }

  return resolveAppLocale(acceptLanguage) ?? 'en';
}
