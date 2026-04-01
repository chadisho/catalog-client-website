import ProductPage from '../../../../features/product/pages';
import {
  getProductByCode,
  type ProductDetailsModel,
} from '../../../../features/product/api/productApi';

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
  const normalizedProductCode = productCode.replace('chp-', '');

  let data: ProductDetailsModel | undefined;
  let error: string | undefined;

  try {
    data = await getProductByCode(normalizedProductCode);
  } catch {
    error = 'product_fetch_failed';
  }

  return <ProductPage productCode={normalizedProductCode} data={data} error={error} />;
}
