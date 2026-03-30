import ShopPage from '../../../features/shop/pages';
import { getShopBySlug } from '../../../features/shop/api/shopApi';

interface ShopRouteParams {
  shopUsername: string;
}

interface ShopRoutePageProps {
  params: Promise<ShopRouteParams>;
}

export default async function Page({ params }: ShopRoutePageProps) {
  const { shopUsername } = await params;

  try {
    const data = await getShopBySlug(shopUsername);
    return <ShopPage shopUsername={shopUsername} data={data} />;
  } catch {
    return <ShopPage shopUsername={shopUsername} error="Error..." />;
  }
}
