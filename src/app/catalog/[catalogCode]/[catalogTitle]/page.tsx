import CatalogPage from '../../../../features/catalog/pages';
import { getCatalogByCode } from '../../../../features/catalog/api/catalogApi';

interface CatalogRouteParams {
  catalogCode: string;
  catalogTitle: string;
}

interface CatalogRoutePageProps {
  params: Promise<CatalogRouteParams>;
}

export default async function Page({ params }: CatalogRoutePageProps) {
    const resolvedParams = await params;

  const { catalogCode } = resolvedParams;
    const normalizedCatalogCode = catalogCode.replace('chc-', '');
  if (!normalizedCatalogCode) {
    console.error('Catalog code is missing in route params:', resolvedParams);
    return <CatalogPage catalogCode="" error="Error..." />;
  }

  try {
    const data = await getCatalogByCode(normalizedCatalogCode);
    return <CatalogPage catalogCode={normalizedCatalogCode} data={data} />;
  } catch (error) {
    console.error('Failed to fetch catalog by code:', error);
    return <CatalogPage catalogCode={normalizedCatalogCode} error="Error..." />;
  }
}
