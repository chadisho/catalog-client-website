/**
 * Catalog object shape based on API JSON keys
 */
export type CatalogModel = {
  id?: number | null;
  title: string;
  url?: string | null;
  image?: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  orderingStatus?: string | null;
  showProductPriceStatus?: string | null;
  language?: string | null;
};

export const mapCatalog = (data: any): CatalogModel => {
  return {
    id: typeof data?.id === 'number' ? data.id : null,
    title: typeof data?.title === 'string' ? data.title : '',
    url: typeof data?.url === 'string' ? data.url : null,
    image:
      typeof data?.image === 'string'
        ? data.image
        : typeof data?.primaryImage === 'string'
          ? data.primaryImage
          : null,
    description: typeof data?.description === 'string' ? data.description : null,
    createdAt: typeof data?.created_at === 'string' ? data.created_at : null,
    updatedAt: typeof data?.updated_at === 'string' ? data.updated_at : null,
    orderingStatus: typeof data?.ordering_status === 'string' ? data.ordering_status : null,
    showProductPriceStatus:
      typeof data?.show_product_price_status === 'string' ? data.show_product_price_status : null,
    language: typeof data?.language === 'string' ? data.language : null,
  };
};

export const mapCatalogs = (data: any): CatalogModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => mapCatalog(item?.sectionable ?? item));
};
