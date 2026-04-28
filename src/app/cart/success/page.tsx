import { cookies } from 'next/headers';
import {
  DEFAULT_APP_LOCALE,
  LOCALE_COOKIE_KEY,
  resolveAppLocale,
} from '../../../core/i18n/globalLocale';
import CartSuccessPage from '../../../features/cart/pages/success';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const cookieStore = await cookies();
  const locale = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? DEFAULT_APP_LOCALE;

  return <CartSuccessPage locale={locale} />;
}
