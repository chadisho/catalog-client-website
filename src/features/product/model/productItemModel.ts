export type ImageProductModel = {
  src?: string | null;
  id?: number | null;
  name?: string | null;
};

export type ProductItemModel = {
  id?: number | null;
  title?: string | null;
  price?: string | null;
  coverImage?: string | null;
  currency?: string | null;
  inventory?: number | null;
  stockType?: string | null;
  description?: string | null;
  salePrice?: string | null;
  attachment?: string | null;
  unit?: string | null;
  images: ImageProductModel[];
  videos: string[];
};

export const mapImageProduct = (data: any): ImageProductModel => {
  return {
    src: typeof data?.src === 'string' ? data.src : null,
    id: typeof data?.id === 'number' ? data.id : null,
    name: typeof data?.name === 'string' ? data.name : null,
  };
};

export const mapImageProducts = (data: any): ImageProductModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapImageProduct);
};

export const mapProductItem = (data: any): ProductItemModel => {
  const source = data?.sectionable ?? data;
  const mapJson = source;

  return {
    id: typeof source?.id === 'number' ? source.id : null,
    title:
      typeof source?.name === 'string'
        ? source.name
        : typeof source?.title === 'string'
          ? source.title
          : null,
    price: typeof source?.price === 'string' ? source.price : null,
    coverImage:
      typeof source?.primary_image === 'string'
        ? source.primary_image
        : typeof source?.coverImage === 'string'
          ? source.coverImage
          : null,
    currency: typeof source?.currency === 'string' ? source.currency : 'toman',
    inventory:
      typeof source?.quantity === 'number'
        ? source.quantity
        : typeof source?.inventory === 'number'
          ? source.inventory
          : 0,
    stockType: typeof source?.stock_type === 'string' ? source.stock_type : null,
    description: typeof source?.description === 'string' ? source.description : null,
    salePrice:
      typeof source?.sale_price === 'string'
        ? source.sale_price
        : typeof source?.salePrice === 'string'
          ? source.salePrice
          : null,
    attachment: typeof source?.attachment === 'string' ? source.attachment : null,
    unit: typeof source?.unit === 'string' ? source.unit : null,
    images: mapImageProducts(mapJson?.images),
    videos: Array.isArray(mapJson?.videos)
      ? mapJson.videos
          .map((item: any) => (typeof item?.name === 'string' ? item.name : null))
          .filter((name: string | null): name is string => Boolean(name))
      : [],
  };
};

export const mapProductItems = (data: any): ProductItemModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapProductItem);
};
