import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useCatalog } from '../hooks/useCatalog';

export default function CatalogPage() {
  const params = useParams<{ catalogCode?: string }>();

  const catalogCode = useMemo(() => {
    const path = window.location.pathname;
    console.log('[CatalogPage] URL:', path);

    if (params.catalogCode) {
      console.log('[CatalogPage] URL param catalogCode:', params.catalogCode);
      return params.catalogCode;
    }

    const match = path.match(/\/catalog\/(\d+)/);
    const code = match?.[1] ?? '';
    console.log('[CatalogPage] Parsed catalogCode:', code);
    return code;
  }, [params.catalogCode]);

  const { data, isLoading, isError } = useCatalog(catalogCode);

  if (!catalogCode) {
    return <div>Invalid catalog code in URL</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  if (!data) {
    return <div>No catalog data returned</div>;
  }

  return (
    <div>
      <h1>Catalog Details</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}