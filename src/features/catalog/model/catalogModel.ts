/**
 * Catalog object shape based on API JSON keys
 */
export type CatalogModel = {
  id?: number | null;
  title: string;
  uri?: string | null;
  image?: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  orderingStatus?: string | null;
  showProductPriceStatus?: string | null;
  language?: string | null;
};

export const mapCatalog = (data: any): CatalogModel => {
  const catalogId =
    typeof data?.id === 'number'
      ? data.id
      : typeof data?.code === 'number'
        ? data.code
        : typeof data?.code === 'string' && /^\d+$/.test(data.code)
          ? Number(data.code)
          : null;

  return {
    id: catalogId,
    title: typeof data?.title === 'string' ? data.title : '',
    uri: typeof data?.uri === 'string' ? data.uri : typeof data?.url === 'string' ? data.url : null,
    image:
      typeof data?.image === 'string'
        ? data.image
        : typeof data?.primaryImage === 'string'
          ? data.primaryImage
          : typeof data?.primary_image === 'string'
            ? data.primary_image
            : null,
    description: typeof data?.description === 'string' ? data.description : null,
    createdAt:
      typeof data?.created_at === 'string'
        ? data.created_at
        : typeof data?.createdAt === 'string'
          ? data.createdAt
          : null,
    updatedAt:
      typeof data?.updated_at === 'string'
        ? data.updated_at
        : typeof data?.updatedAt === 'string'
          ? data.updatedAt
          : null,
    orderingStatus:
      typeof data?.ordering_status === 'string'
        ? data.ordering_status
        : typeof data?.orderingStatus === 'string'
          ? data.orderingStatus
          : null,
    showProductPriceStatus:
      typeof data?.show_product_price_status === 'string'
        ? data.show_product_price_status
        : typeof data?.showProductPriceStatus === 'string'
          ? data.showProductPriceStatus
          : typeof data?.showPriceStatus === 'string'
            ? data.showPriceStatus
            : null,
    language: typeof data?.language === 'string' ? data.language : null,
  };
};

export const mapCatalogs = (data: any): CatalogModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => mapCatalog(item?.sectionable ?? item));
};
