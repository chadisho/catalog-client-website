import { cookies } from 'next/headers';
import CartPage from '../../features/cart/pages';
import { DEFAULT_APP_LOCALE, LOCALE_COOKIE_KEY, resolveAppLocale } from '../../core/i18n/globalLocale';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({ searchParams }: { searchParams: Promise<{ shopSlug?: string; shopId?: string }> }) {
  const cookieStore = await cookies();
  const locale = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? DEFAULT_APP_LOCALE;
  const { shopSlug, shopId } = await searchParams;
  const shopIdNum = shopId ? (Number(shopId) || undefined) : undefined;

  return <CartPage locale={locale} shopSlug={shopSlug} shopId={shopIdNum} />;
}
