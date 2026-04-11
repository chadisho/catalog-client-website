import { cookies } from 'next/headers';
import CartPage from '../../features/cart/pages';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../core/i18n/globalLocale';

export default async function Page() {
  const cookieStore = await cookies();
  const locale = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? 'en';

  return <CartPage locale={locale} />;
}
