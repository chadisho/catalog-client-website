import { cookies } from 'next/headers';
import { AUTH_TOKEN_COOKIE_KEY } from '../../../core/constants/auth';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../../core/i18n/globalLocale';
import OrdersPage from '../../../features/auth/pages/orders';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const cookieStore = await cookies();
  const locale = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? 'en';
  const isAuthenticated = Boolean(cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value);

  return <OrdersPage locale={locale} isAuthenticated={isAuthenticated} />;
}
