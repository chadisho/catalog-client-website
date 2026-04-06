import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { Providers } from '../core/providers';
import {
  getDirectionByLocale,
  LOCALE_COOKIE_KEY,
  type AppLocale,
  resolveAppLocale,
} from '../core/i18n/globalLocale';
import '../index.css';

export const metadata: Metadata = {
  title: 'Chadisho Catalog',
  description: 'Catalog, product and shop pages',
};

interface RootLayoutProps {
  children: ReactNode;
}

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

async function resolveLayoutLocale(): Promise<AppLocale> {
  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get('cookie');
  const acceptLanguage = requestHeaders.get('accept-language');

  const localeFromCookie = resolveAppLocale(extractCookieValue(cookieHeader, LOCALE_COOKIE_KEY));

  if (localeFromCookie) {
    return localeFromCookie;
  }

  return resolveAppLocale(acceptLanguage) ?? 'en';
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await resolveLayoutLocale();
  const direction = getDirectionByLocale(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}