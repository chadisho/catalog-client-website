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

export async function getShopBySlug(
  shopUsername: string
): Promise<ShopInformationModel> {
  const response = (await apiClient(`app/shop/profile/${shopUsername}`, {
    method: 'GET',
  })) as Record<string, unknown>;

  return mapShopInformation(response?.options ?? response);
}

export async function getShopBySlugCached(
  shopUsername: string
): Promise<ShopInformationModel> {
  const response = (await apiClient(`app/shop/profile/${shopUsername}`, {
    method: 'GET',
    cache: 'force-cache',
    next: { revalidate: 120 },
  })) as Record<string, unknown>;

  return mapShopInformation(response?.options ?? response);
}
