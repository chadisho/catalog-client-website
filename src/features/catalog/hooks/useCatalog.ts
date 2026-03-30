import { useQuery } from '@tanstack/react-query';
import type { CatalogDetailsModel } from '../api/catalogApi';
import { getCatalogByCode } from '../api/catalogApi';

interface UseCatalogReturn {
  data: CatalogDetailsModel | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Hook to fetch catalog by catalog code
 * @param catalogCode - Catalog code to fetch
 * @returns Catalog data with loading and error states
 */
export function useCatalog(catalogCode: string): UseCatalogReturn {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['catalog', catalogCode],
    queryFn: () => getCatalogByCode(catalogCode),
    enabled: !!catalogCode,
  });

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
  };
}
