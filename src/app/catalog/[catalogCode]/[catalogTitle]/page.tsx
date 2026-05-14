import { cache } from 'react';
import type { Metadata } from 'next';
import CatalogPage from '../../../../features/catalog/pages';
import { cookies } from 'next/headers';
import {
  getCatalogByCode,
  type CatalogDetailsModel,
} from '../../../../features/catalog/api/catalogApi';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../../../core/i18n/globalLocale';

const SITE_URL = 'https://chadisho.com';

const getCachedCatalog = cache(getCatalogByCode);

interface CatalogRouteParams {
  catalogCode: string;
  catalogTitle: string;
}

interface CatalogRoutePageProps {
  params: Promise<CatalogRouteParams>;
}

function toMetaDescription(html: string | null | undefined, maxLen = 160): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

export async function generateMetadata({ params }: CatalogRoutePageProps): Promise<Metadata> {
  const { catalogCode } = await params;
  const normalizedCatalogCode = catalogCode.replace('chc-', '');

  if (!normalizedCatalogCode) {
    return {
      title: 'Chadisho',
      description: '',
    };
  }

  try {
    const data = await getCachedCatalog(normalizedCatalogCode);

    const title = data.catalogModel?.title ?? 'Chadisho';
    const description = toMetaDescription(data.catalogModel?.description);
    const image = data.catalogModel?.image ?? data.images?.[0]?.image ?? `${SITE_URL}/favicon.png`;

    const encodedTitle = encodeURIComponent(data.catalogModel?.title ?? '');
    const canonicalUrl = `${SITE_URL}/catalog/chc-${normalizedCatalogCode}/${encodedTitle}`;

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

export default async function Page({ params }: CatalogRoutePageProps) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const localeOverride = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);

  const { catalogCode } = resolvedParams;
  const normalizedCatalogCode = catalogCode.replace('chc-', '');
  if (!normalizedCatalogCode) {
    console.error('Catalog code is missing in route params:', resolvedParams);
    return <CatalogPage catalogCode="" error="invalid_catalog_code" localeOverride={localeOverride} />;
  }

  let data: CatalogDetailsModel | undefined;
  let error: string | undefined;

  try {
    data = await getCachedCatalog(normalizedCatalogCode);
  } catch (fetchError) {
    console.error('Failed to fetch catalog by code:', fetchError);
    error = fetchError instanceof Error ? fetchError.message : 'catalog_fetch_failed';
  }

  return (
    <CatalogPage
      catalogCode={normalizedCatalogCode}
      data={data}
      error={error}
      localeOverride={localeOverride}
    />
  );
}
