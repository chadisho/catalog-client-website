import { cache } from 'react';
import type { Metadata } from 'next';
import ProductPage from '../../../../features/product/pages';
import { cookies } from 'next/headers';
import {
  getProductByCode,
  type ProductDetailsModel,
} from '../../../../features/product/api/productApi';
import { LOCALE_COOKIE_KEY, resolveAppLocale, DEFAULT_APP_LOCALE } from '../../../../core/i18n/globalLocale';

const SITE_URL = 'https://chadisho.com';

const getCachedProduct = cache(getProductByCode);

interface ProductRouteParams {
  productCode: string;
  productTitle: string;
}

interface ProductRoutePageProps {
  params: Promise<ProductRouteParams>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function toMetaDescription(html: string | null | undefined, maxLen = 160): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

function resolveShouldShowPrice(searchParams?: Record<string, string | string[] | undefined>): boolean {
  const rawValue = searchParams?.shouldShowPrice;
  const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;

  return value !== 'false';
}

export async function generateMetadata({ params }: ProductRoutePageProps): Promise<Metadata> {
  const { productCode } = await params;
  const normalizedProductCode = productCode.replace('chp-', '');

  try {
    const data = await getCachedProduct(normalizedProductCode);

    const title = data.productModel.title ?? 'Chadisho';
    const description = toMetaDescription(data.productModel.description);
    const image = data.productModel.coverImage ?? data.productModel.images[0]?.src ?? `${SITE_URL}/favicon.png`;

    const encodedTitle = encodeURIComponent(data.productModel.title ?? '');
    const canonicalUrl = `${SITE_URL}/product/chp-${normalizedProductCode}/${encodedTitle}`;

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: 'website',
        siteName: 'Chadisho',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
        site: '@chadisho',
        creator: '@chadisho',
      },
    };
  } catch {
    return {
      title: 'Chadisho',
      description: '',
    };
  }
}

export default async function Page({ params, searchParams }: ProductRoutePageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const cookieStore = await cookies();
  const localeOverride = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? DEFAULT_APP_LOCALE;
  const shouldShowPrice = resolveShouldShowPrice(resolvedSearchParams);

  const { productCode } = resolvedParams;
  const normalizedProductCode = productCode.replace('chp-', '');

  let data: ProductDetailsModel | undefined;
  let error: string | undefined;

  try {
    data = await getCachedProduct(normalizedProductCode);
  } catch (fetchError) {
    error = fetchError instanceof Error ? fetchError.message : 'product_fetch_failed';
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
