import CatalogPage from '../../../../features/catalog/pages';
import {
  getCatalogByCode,
  type CatalogDetailsModel,
} from '../../../../features/catalog/api/catalogApi';
import { resolveRequestedCatalogLocale } from '../../../../core/i18n/catalogLocale';

interface CatalogRouteParams {
  catalogCode: string;
  catalogTitle: string;
}

interface CatalogRoutePageProps {
  params: Promise<CatalogRouteParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({ params, searchParams }: CatalogRoutePageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const requestedLang = resolvedSearchParams.lang;
  const localeOverride = resolveRequestedCatalogLocale(
    Array.isArray(requestedLang) ? requestedLang[0] : requestedLang
  );

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
