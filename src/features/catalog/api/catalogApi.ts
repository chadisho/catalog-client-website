import { apiClient } from '../../../core/api';
import { mapCatalog, type CatalogModel } from '../model/catalogModel';
import { mapCatalogImages, type CatalogImageModel } from '../model/catalogImageModel';
import { mapSections, type AnySectionModel } from '../model/sectionModel';
import { mapShopInformation, type ShopInformationModel } from '../../shop/model/shopInformationModel';

export interface CatalogDetailsModel {
  catalogModel?: CatalogModel;
  sections?: AnySectionModel[];
  images?: CatalogImageModel[];
  shopInformation?: ShopInformationModel;
}

export function mapCatalogDetails(response: Record<string, unknown>): CatalogDetailsModel {
  const options = (response?.options ?? response ?? {}) as Record<string, unknown>;
  const rawShop = options.shopInformation ?? options.shopInformations;
  const rawSections = options.catalogSections ?? options.catalog_sections ?? options.sections;
  const rawImages = options.catalogImages ?? options.catalog_images ?? options.images;

  return {
    catalogModel: options.catalog ? mapCatalog(options.catalog) : undefined,
    sections: mapSections(rawSections),
    images: mapCatalogImages(rawImages),
    shopInformation: rawShop ? mapShopInformation(rawShop) : undefined,
  };
}

/**
 * Fetch catalog details by catalog code
 * @param catalogCode - Catalog code to fetch
 * @returns Catalog details
 */
export async function getCatalogByCode(
  catalogCode: string
): Promise<CatalogDetailsModel> {
  const response = (await apiClient(`app/catalog/show/${catalogCode}`, {
    method: 'POST',
  })) as Record<string, unknown>;

  return mapCatalogDetails(response);
}
