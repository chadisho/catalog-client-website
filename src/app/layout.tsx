import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { Providers } from '../core/providers';
import {
  DEFAULT_APP_LOCALE,
  getDirectionByLocale,
  LOCALE_COOKIE_KEY,
  type AppLocale,
  resolveAppLocale,
} from '../core/i18n/globalLocale';
import '../index.css';

export const metadata: Metadata = {
  title: 'Chadisho Catalog',
  description: 'Catalog, product and shop pages',
  icons: {
    icon: '/favicon.png',
  },
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

  const forcedLocale = resolveAppLocale(requestHeaders.get('x-forced-locale'));
  if (forcedLocale) return forcedLocale;

  const cookieHeader = requestHeaders.get('cookie');

  return resolveAppLocale(extractCookieValue(cookieHeader, LOCALE_COOKIE_KEY)) ?? DEFAULT_APP_LOCALE;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await resolveLayoutLocale();
  const direction = getDirectionByLocale(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <div id="modal-root" />
      </body>
    </html>
  );
}