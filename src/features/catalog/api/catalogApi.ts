import { apiClient } from '../../../core/api';

export interface CatalogDetailsModel {
  catalogModel?: Record<string, any>;
  sections: Array<any>;
  images: Array<any>;
  shopInformation?: Record<string, any>;
}

/**
 * Fetch catalog details by catalog code
 * @param catalogCode - Catalog code to fetch
 * @returns Catalog details
 */
export async function getCatalogByCode(
  catalogCode: string
): Promise<CatalogDetailsModel> {
  return apiClient(`app/catalog/show/${catalogCode}`, {
    method: 'POST',
  });
}
