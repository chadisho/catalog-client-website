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
  })) as Record<string, any>;

  return {
    catalogModel: response?.options?.catalog ? mapCatalog(response?.options?.catalog) : undefined,
    sections: mapSections(response?.options?.catalogSections),
    images: mapCatalogImages(response?.options?.catalogImages),
      shopInformation: response?.options?.shopInformations ? mapShopInformation({
          fa_name: response?.options?.shopInformations.faName,
          en_name: response?.options?.shopInformations.enName,
          avatar:response?.options?.shopInformations.avatar,
      }
) : undefined,
  };
}
