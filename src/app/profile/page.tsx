import { cookies } from 'next/headers';
import ProfilePage from '../../features/auth/pages/profile';
import { AUTH_TOKEN_COOKIE_KEY } from '../../core/constants/auth';
import { DEFAULT_APP_LOCALE, LOCALE_COOKIE_KEY, resolveAppLocale } from '../../core/i18n/globalLocale';

export default async function Page() {
  const cookieStore = await cookies();
  const locale = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? DEFAULT_APP_LOCALE;
  const isAuthenticated = Boolean(cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value);

  return <ProfilePage locale={locale} isAuthenticated={isAuthenticated} />;
}
