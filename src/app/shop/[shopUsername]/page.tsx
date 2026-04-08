import ShopPage from '../../../features/shop/pages';
import { getShopBySlug } from '../../../features/shop/api/shopApi';
import type { ShopInformationModel } from '../../../features/shop/model/shopInformationModel';

interface ShopRouteParams {
  shopUsername: string;
}

interface ShopRoutePageProps {
  params: Promise<ShopRouteParams>;
}

export default async function Page({ params }: ShopRoutePageProps) {
  const { shopUsername } = await params;

  let data: ShopInformationModel | undefined;
  let error: string | undefined;

  try {
    data = await getShopBySlug(shopUsername);
  } catch {
    error = 'shop_fetch_failed';
  }

  return <ShopPage shopUsername={shopUsername} data={data} error={error} />;
}
