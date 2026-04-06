import ProductPage from '../../../../features/product/pages';
import { cookies } from 'next/headers';
import {
  getProductByCode,
  type ProductDetailsModel,
} from '../../../../features/product/api/productApi';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../../../core/i18n/globalLocale';

interface ProductRouteParams {
  productCode: string;
  productTitle: string;
}

interface ProductRoutePageProps {
  params: Promise<ProductRouteParams>;
}

export default async function Page({ params }: ProductRoutePageProps) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const localeOverride = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);

  const { productCode } = resolvedParams;
  const normalizedProductCode = productCode.replace('chp-', '');

  let data: ProductDetailsModel | undefined;
  let error: string | undefined;

  try {
    data = await getProductByCode(normalizedProductCode);
  } catch {
    error = 'product_fetch_failed';
  }

  return (
    <ProductPage
      productCode={normalizedProductCode}
      data={data}
      error={error}
      localeOverride={localeOverride}
    />
  );
}
