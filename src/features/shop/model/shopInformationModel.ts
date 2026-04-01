import { mapShopingAddresses, type ShopingAddressModel } from './shopingAddressModel';

export type ShopInformationModel = {
  faName?: string | null;
  enName?: string | null;
  aboutUs?: string | null;
  avatar?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  telegram?: string | null;
  website?: string | null;
  addresses: ShopingAddressModel[];
};

export const mapShopInformation = (data: any): ShopInformationModel => {
  const shop = data?.shop ?? data;
  const social = data?.shopSocialAccounts ?? {};

  return {
    faName: typeof shop?.fa_name === 'string' ? shop.fa_name : null,
    enName: typeof shop?.en_name === 'string' ? shop.en_name : null,
    aboutUs: typeof shop?.about_us === 'string' ? shop.about_us : null,
    avatar: typeof shop?.avatar === 'string' ? shop.avatar : null,
    instagram: typeof social?.instagram === 'string' ? social.instagram : null,
    whatsapp: typeof social?.whatsapp === 'string' ? social.whatsapp : null,
    telegram: typeof social?.telegram === 'string' ? social.telegram : null,
    website: typeof social?.website === 'string' ? social.website : null,
    addresses: mapShopingAddresses(data?.shopAddresses),
  };
};
