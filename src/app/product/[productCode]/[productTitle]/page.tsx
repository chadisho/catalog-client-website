import ProductPage from '../../../../features/product/pages';
import { getProductByCode } from '../../../../features/product/api/productApi';

interface ProductRouteParams {
  productCode: string;
  productTitle: string;
}

interface ProductRoutePageProps {
  params: Promise<ProductRouteParams>;
}

export default async function Page({ params }: ProductRoutePageProps) {
    const resolvedParams = await params;
   
  const { productCode } = resolvedParams;
  const normalizedProductCode = productCode.replace('chp-','');

  try {
    const data = await getProductByCode(normalizedProductCode);
    return <ProductPage productCode={normalizedProductCode} data={data} />;
  } catch {
    return <ProductPage productCode={normalizedProductCode} error="Error..." />;
  }
}
