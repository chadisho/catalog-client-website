import { useQuery } from '@tanstack/react-query';
import type { ProductDetailsModel } from '../api/productApi';
import { getProductByCode } from '../api/productApi';

interface UseProductReturn {
  data: ProductDetailsModel | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Hook to fetch product by product code
 * @param productCode - Product code to fetch
 * @returns Product data with loading and error states
 */
export function useProduct(productCode: string): UseProductReturn {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', productCode],
    queryFn: () => getProductByCode(productCode),
    enabled: !!productCode,
  });

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
  };
}
