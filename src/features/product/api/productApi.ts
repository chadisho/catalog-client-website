import { apiClient } from '../../../core/api';
import { mapProductDetails, type ProductDetailsModel } from '../model/productDetailsModel';

export type { ProductDetailsModel };

/**
 * Fetch product details by product code
 * @param productCode - Product code to fetch
 * @returns Product details
 */
export async function getProductByCode(
  productCode: string
): Promise<ProductDetailsModel> {
  const response = await apiClient(`app/product/show/${productCode}`, {
    method: 'POST',
  });
console.log('API Response for product details:', response);
  return mapProductDetails(response);
}
