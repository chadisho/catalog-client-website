export type ShopingAddressModel = {
  id: number;
  type?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
  address?: string | null;
  title?: string | null;
  preNumber: string;
  phone: string;
  lon?: string | null;
  lat?: string | null;
  formatedAddress?: string | null;
};

export const mapShopingAddress = (data: any): ShopingAddressModel => {
  return {
    id: typeof data?.id === 'number' ? data.id : 0,
    type: typeof data?.type === 'string' ? data.type : null,
    city: typeof data?.city === 'string' ? data.city : null,
    province: typeof data?.province === 'string' ? data.province : null,
    postalCode: typeof data?.postal_code === 'string' ? data.postal_code : null,
    address: typeof data?.address === 'string' ? data.address : null,
    title: typeof data?.name === 'string' ? data.name : null,
    preNumber: typeof data?.prenumber === 'string' ? data.prenumber : '',
    phone: typeof data?.telephone === 'string' ? data.telephone : '',
    lon: typeof data?.longitude === 'string' ? data.longitude : null,
    lat: typeof data?.latitude === 'string' ? data.latitude : null,
    formatedAddress:
      typeof data?.formatted_address === 'string' ? data.formatted_address : null,
  };
};

export const mapShopingAddresses = (data: any): ShopingAddressModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapShopingAddress);
};
