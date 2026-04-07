import { cookies } from 'next/headers';
import CartPage from '../../features/cart/pages';
import { getCart } from '../../features/cart/api/cartApi';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../core/i18n/globalLocale';

export default async function Page() {
  const cookieStore = await cookies();
  const locale = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? 'en';

  try {
    const data = await getCart();
    return <CartPage data={data} locale={locale} />;
  } catch {
    return <CartPage error="cart_fetch_failed" locale={locale} />;
  }
}
