import CatalogPage from '../../../../features/catalog/pages';
import { cookies } from 'next/headers';
import {
  getCatalogByCode,
  type CatalogDetailsModel,
} from '../../../../features/catalog/api/catalogApi';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../../../core/i18n/globalLocale';

interface CatalogRouteParams {
  catalogCode: string;
  catalogTitle: string;
}

interface CatalogRoutePageProps {
  params: Promise<CatalogRouteParams>;
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
    data = await getCatalogByCode(normalizedCatalogCode);
  } catch (fetchError) {
    console.error('Failed to fetch catalog by code:', fetchError);
    error = 'catalog_fetch_failed';
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
