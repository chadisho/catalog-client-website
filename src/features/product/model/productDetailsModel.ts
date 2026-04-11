import { mapProductItem, type ProductItemModel } from './productItemModel';
import {
  mapShopInformation,
  type ShopInformationModel,
} from '../../shop/model/shopInformationModel';
import {
  mapVariationAttributes,
  type VariationAttributeModel,
} from './variationAttributeModel';
import { mapVariations, type VariationModel } from './variationModel';

export type ProductDetailsProductModel = ProductItemModel & {
  language?: string | null;
};

export interface ProductDetailsModel {
  variationAttributes?: VariationAttributeModel[];
  variations?: VariationModel[];
  productModel: ProductDetailsProductModel;
  shopInformation?: ShopInformationModel;
}

export const mapProductDetailsProduct = (data: any): ProductDetailsProductModel => {
  const source = data?.product ?? data;

  return {
    ...mapProductItem(data),
    language: typeof source?.language === 'string' ? source.language : null,
  };
};

export const mapProductShopInformation = (data: any): ShopInformationModel => {
  const source = data?.shop ?? data;

  return mapShopInformation({
    shop: {
      fa_name:
        typeof source?.fa_name === 'string'
          ? source.fa_name
          : typeof source?.faName === 'string'
            ? source.faName
            : null,
      en_name:
        typeof source?.en_name === 'string'
          ? source.en_name
          : typeof source?.enName === 'string'
            ? source.enName
            : null,
      about_us:
        typeof source?.about_us === 'string'
          ? source.about_us
          : typeof source?.aboutUs === 'string'
            ? source.aboutUs
            : null,
      avatar: typeof source?.avatar === 'string' ? source.avatar : null,
    },
    shopSocialAccounts: {
      instagram: typeof source?.instagram === 'string' ? source.instagram : null,
      whatsapp: typeof source?.whatsapp === 'string' ? source.whatsapp : null,
      telegram: typeof source?.telegram === 'string' ? source.telegram : null,
      website: typeof source?.website === 'string' ? source.website : null,
    },
    shopAddresses: source?.addresses,
  });
};

export const mapProductDetails = (response: any): ProductDetailsModel => {
  const options = response?.options ?? response ?? {};
  const rawShopInformation =
    options?.shopInformation ?? options?.shopInformations ?? response?.shopInformation;

  return {
    variationAttributes: mapVariationAttributes(options?.variation_attributes),
    variations: mapVariations(options?.variations),
      productModel: mapProductDetailsProduct({
          product: options?.product,
        videos: options?.videos,
        images: options?.images,

    }),
    shopInformation: rawShopInformation
      ? mapProductShopInformation(rawShopInformation)
      : undefined,
  };
};
