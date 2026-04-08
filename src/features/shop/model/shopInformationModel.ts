import { mapShopingAddresses, type ShopingAddressModel } from './shopingAddressModel';

export type ShopInformationModel = {
  faName?: string | null;
  enName?: string | null;
  aboutUs?: string | null;
  avatar?: string | null;
  coverImage?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  telegram?: string | null;
  website?: string | null;
  addresses: ShopingAddressModel[];
};

export const mapShopInformation = (data: any): ShopInformationModel => {
  const shop = data?.shop ?? data;
  const social = data?.shopSocialAccounts ?? data?.shop_social_accounts ?? data ?? {};

  return {
    faName:
      typeof shop?.fa_name === 'string'
        ? shop.fa_name
        : typeof shop?.faName === 'string'
          ? shop.faName
          : null,
    enName:
      typeof shop?.en_name === 'string'
        ? shop.en_name
        : typeof shop?.enName === 'string'
          ? shop.enName
          : null,
    aboutUs:
      typeof shop?.about_us === 'string'
        ? shop.about_us
        : typeof shop?.aboutUs === 'string'
          ? shop.aboutUs
          : null,
    avatar: typeof shop?.avatar === 'string' ? shop.avatar : null,
    coverImage:
      typeof shop?.cover_image === 'string'
        ? shop.cover_image
        : typeof shop?.coverImage === 'string'
          ? shop.coverImage
          : null,
    instagram:
      typeof social?.instagram === 'string'
        ? social.instagram
        : typeof shop?.instagram === 'string'
          ? shop.instagram
          : null,
    whatsapp:
      typeof social?.whatsapp === 'string'
        ? social.whatsapp
        : typeof shop?.whatsapp === 'string'
          ? shop.whatsapp
          : null,
    telegram:
      typeof social?.telegram === 'string'
        ? social.telegram
        : typeof shop?.telegram === 'string'
          ? shop.telegram
          : null,
    website:
      typeof social?.website === 'string'
        ? social.website
        : typeof shop?.website === 'string'
          ? shop.website
          : null,
    addresses: mapShopingAddresses(data?.shopAddresses ?? data?.shop_addresses ?? shop?.addresses),
  };
};
