import ProductPage from '../../../../features/product/pages';
import { cookies } from 'next/headers';
import {
  getProductByCode,
  type ProductDetailsModel,
} from '../../../../features/product/api/productApi';
import { LOCALE_COOKIE_KEY, resolveAppLocale,DEFAULT_APP_LOCALE } from '../../../../core/i18n/globalLocale';

interface ProductRouteParams {
  productCode: string;
  productTitle: string;
}

interface ProductRoutePageProps {
  params: Promise<ProductRouteParams>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function resolveShouldShowPrice(searchParams?: Record<string, string | string[] | undefined>): boolean {
  const rawValue = searchParams?.shouldShowPrice;
  const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;

  return value !== 'false';
}

export default async function Page({ params, searchParams }: ProductRoutePageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const cookieStore = await cookies();
    console.log(cookieStore.get(LOCALE_COOKIE_KEY)?.value);
  const localeOverride = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value)??DEFAULT_APP_LOCALE;
  const shouldShowPrice = resolveShouldShowPrice(resolvedSearchParams);

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
      shouldShowPrice={shouldShowPrice}
    />
  );
}
