import { cache } from 'react';
import type { Metadata } from 'next';
import ShopPage from '../../../features/shop/pages';
import { cookies } from 'next/headers';
import { getShopBySlug } from '../../../features/shop/api/shopApi';
import type { ShopInformationModel } from '../../../features/shop/model/shopInformationModel';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../../core/i18n/globalLocale';

const SITE_URL = 'https://chadisho.com';

const getCachedShop = cache(getShopBySlug);

interface ShopRouteParams {
  shopUsername: string;
}

interface ShopRoutePageProps {
  params: Promise<ShopRouteParams>;
}

function toMetaDescription(html: string | null | undefined, maxLen = 160): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

export async function generateMetadata({ params }: ShopRoutePageProps): Promise<Metadata> {
  const { shopUsername } = await params;

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

export default async function Page({ params }: ShopRoutePageProps) {
  const { shopUsername } = await params;
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
