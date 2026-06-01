import { cookies } from 'next/headers';
import { AUTH_TOKEN_COOKIE_KEY } from '../../../core/constants/auth';
import { DEFAULT_APP_LOCALE, LOCALE_COOKIE_KEY, resolveAppLocale } from '../../../core/i18n/globalLocale';
import { getCatalogTranslations } from '../../../core/i18n/catalogLocale';
import AddressesPage from '../../../features/auth/pages/addresses';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const cookieStore = await cookies();
  const locale = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? DEFAULT_APP_LOCALE;
  const isAuthenticated = Boolean(cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value);
  const t = getCatalogTranslations(locale);

  return <AddressesPage locale={locale} isAuthenticated={isAuthenticated} t={t} />;
}
