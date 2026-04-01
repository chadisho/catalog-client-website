import { mapCatalogs, type CatalogModel } from './catalogModel';
import { mapProductItems, type ProductItemModel } from '../../product/model/productItemModel';

export type SectionModel<T> = {
  id: number;
  sectionable_type: string;
  values: T[];
  title: string;
  view_option?: string | null;
};

export type ProductSectionModel = SectionModel<ProductItemModel> & {
  sectionable_type: 'product';
};

export type CatalogSectionModel = SectionModel<CatalogModel> & {
  sectionable_type: 'catalog';
};

export type AnySectionModel = ProductSectionModel | CatalogSectionModel;

export const mapSection = (data: any): AnySectionModel | null => {
  const rawType =
    typeof data?.sectionable_type === 'string'
      ? data.sectionable_type.toLowerCase()
      : typeof data?.type === 'string'
        ? data.type.toLowerCase()
              : '';

  const base = {
    id: typeof data?.id === 'number' ? data.id : 0,
    title: typeof data?.title === 'string' ? data.title : '',
    view_option: typeof data?.view_option === 'string' ? data.view_option : null,
  };

  if (rawType.includes('product')) {
    return {
      ...base,
      sectionable_type: 'product',
      values: mapProductItems(data?.items),
    };
  }

  if (rawType.includes('catalog')) {
    return {
      ...base,
      sectionable_type: 'catalog',
      values: mapCatalogs(data?.items),
    };
  }

  return null;
};

export const mapSections = (data: any): AnySectionModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(mapSection)
    .filter((section): section is AnySectionModel => section !== null);
};
