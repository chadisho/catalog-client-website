import ShopPage from '../../../features/shop/pages';
import { cookies } from 'next/headers';
import { getShopBySlug } from '../../../features/shop/api/shopApi';
import type { ShopInformationModel } from '../../../features/shop/model/shopInformationModel';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../../core/i18n/globalLocale';

interface ShopRouteParams {
  shopUsername: string;
}

interface ShopRoutePageProps {
  params: Promise<ShopRouteParams>;
}

export default async function Page({ params }: ShopRoutePageProps) {
  const { shopUsername } = await params;
  const cookieStore = await cookies();
  const localeOverride = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);

  let data: ShopInformationModel | undefined;
  let error: string | undefined;

  try {
    data = await getShopBySlug(shopUsername);
  } catch {
    error = 'shop_fetch_failed';
  }

  return (
    <ShopPage
      shopUsername={shopUsername}
      data={data}
      error={error}
      localeOverride={localeOverride}
    />
  );
}
