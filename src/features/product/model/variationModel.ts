export type VariationAttrModel = {
  title?: string | null;
  id?: number | null;
  value?: string | null;
  type?: number | null;
  unit?: string | null;
  isVariation?: boolean | null;
};

export type VariationModel = {
  id?: number | null;
  price?: string | null;
  salePrice?: string | null;
  sku?: string | null;
  stockType?: string | null;
  inventory?: number | null;
  attrs: VariationAttrModel[];
};

export const mapVariationAttr = (data: any): VariationAttrModel => ({
  title: typeof data?.title === 'string' ? data.title : null,
  id: typeof data?.id === 'number' ? data.id : null,
  value: typeof data?.value === 'string' ? data.value : null,
  type: typeof data?.type === 'number' ? data.type : null,
  unit: typeof data?.unit === 'string' ? data.unit : null,
  isVariation:
    typeof data?.isVariation === 'boolean'
      ? data.isVariation
      : typeof data?.isVariation === 'number'
        ? data.isVariation === 1
        : null,
});

export const mapVariationAttrs = (data: any): VariationAttrModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapVariationAttr);
};

export const mapVariation = (data: any): VariationModel => ({
  id: typeof data?.id === 'number' ? data.id : null,
  price: typeof data?.price === 'string' ? data.price : null,
  salePrice:
    typeof data?.salePrice === 'string'
      ? data.salePrice
      : typeof data?.sale_price === 'string'
        ? data.sale_price
        : null,
  sku: typeof data?.sku === 'string' ? data.sku : null,
  stockType:
    typeof data?.stockType === 'string'
      ? data.stockType
      : typeof data?.stock_type === 'string'
        ? data.stock_type
        : null,
  inventory: typeof data?.inventory === 'number' ? data.inventory : null,
  attrs: mapVariationAttrs(data?.attrs),
});

export const mapVariations = (data: any): VariationModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapVariation);
};
