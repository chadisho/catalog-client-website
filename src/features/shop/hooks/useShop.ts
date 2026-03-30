import { useQuery } from '@tanstack/react-query';
import type { ShopInformation } from '../api/shopApi';
import { getShopBySlug } from '../api/shopApi';

interface UseShopReturn {
  data: ShopInformation | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Hook to fetch shop by shop username/slug
 * @param shopUsername - Shop username/slug to fetch
 * @returns Shop data with loading and error states
 */
export function useShop(shopUsername: string): UseShopReturn {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['shop', shopUsername],
    queryFn: () => getShopBySlug(shopUsername),
    enabled: !!shopUsername,
  });

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
  };
}
