import ShopPage from '../../../features/shop/pages';
import { getShopBySlug, type ShopInformation } from '../../../features/shop/api/shopApi';

interface ShopRouteParams {
  shopUsername: string;
}

interface ShopRoutePageProps {
  params: Promise<ShopRouteParams>;
}

export default async function Page({ params }: ShopRoutePageProps) {
  const { shopUsername } = await params;

  let data: ShopInformation | undefined;
  let error: string | undefined;

  try {
    data = await getShopBySlug(shopUsername);
  } catch {
    error = 'shop_fetch_failed';
  }

  return <ShopPage shopUsername={shopUsername} data={data} error={error} />;
}
