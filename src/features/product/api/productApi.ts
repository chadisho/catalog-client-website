import { apiClient } from '../../../core/api';

export interface ProductDetailsModel {
  variationAttributes?: Array<any>;
  variations?: Array<any>;
  productModel: {
    id: number;
    title: string;
    price: string;
    coverImage: string;
    currency: string;
    uri: string;
    [key: string]: any;
  };
  shopInformation?: Record<string, any>;
}

/**
 * Fetch product details by product code
 * @param productCode - Product code to fetch
 * @returns Product details
 */
export async function getProductByCode(
  productCode: string
): Promise<ProductDetailsModel> {
  return apiClient(`app/product/show/${productCode.replace('chp-','')}`, {
    method: 'POST',
  });
}
