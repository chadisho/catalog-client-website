import { cache } from 'react';
import type { Metadata } from 'next';
import ShopPage from '../../../features/shop/pages';
import { cookies } from 'next/headers';
import { getShopBySlug } from '../../../features/shop/api/shopApi';
import type { ShopInformationModel } from '../../../features/shop/model/shopInformationModel';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../../core/i18n/globalLocale';
import { getSearchParam } from '../../../core/lib/searchParams';

const SITE_URL = 'https://chadisho.com';

const getCachedShop = cache(getShopBySlug);

interface ShopViewPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function toMetaDescription(html: string | null | undefined, maxLen = 160): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

export async function generateMetadata({ searchParams }: ShopViewPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const shopUsername = getSearchParam(resolvedSearchParams, 'shopUsername');

  try {
    const data = await getCachedShop(shopUsername);

    const title = data.faName ?? data.enName ?? 'Chadisho';
    const description = toMetaDescription(data.aboutUs);
    const image = data.avatar ?? data.coverImage ?? `${SITE_URL}/favicon.png`;

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/shop/${shopUsername}`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/shop/${shopUsername}`,
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

export default async function Page({ searchParams }: ShopViewPageProps) {
  const resolvedSearchParams = await searchParams;
  const shopUsername = getSearchParam(resolvedSearchParams, 'shopUsername');
  const cookieStore = await cookies();
  const localeOverride = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);

  let data: ShopInformationModel | undefined;
  let error: string | undefined;

  try {
    data = await getCachedShop(shopUsername);
  } catch (fetchError) {
    error = fetchError instanceof Error ? fetchError.message : 'shop_fetch_failed';
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
