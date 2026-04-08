import { apiClient } from '../../../core/api';
import { mapShopInformation, type ShopInformationModel } from '../model/shopInformationModel';

export interface ShopInformation {
  faName?: string;
  enName?: string;
  aboutUs?: string;
  avatar?: string;
  coverImage?: string;
  educationContent?: number;
  workingDescription?: string;
  getFrom?: string;
  instagram?: string;
  whatsapp?: string;
  telegram?: string;
  website?: string;
  addresses?: Array<any>;
  [key: string]: any;
}

/**
 * Fetch shop information by shop slug/username
 * @param shopUsername - Shop username/slug to fetch
 * @returns Shop information
 */
export async function getShopBySlug(
  shopUsername: string
): Promise<ShopInformationModel> {
  const response = (await apiClient(`app/shop/profile/${shopUsername}`, {
    method: 'GET',
  })) as Record<string, unknown>;

  return mapShopInformation(response?.options ?? response);
}
