export type VariationAttributeValueModel = {
  id?: number | null;
  productId?: number | null;
  attributeId?: number | null;
  value?: string | null;
  isVariation?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type VariationAttributeModel = {
  id?: number | null;
  displayName?: string | null;
  type?: number | null;
  unit?: string | null;
  values: VariationAttributeValueModel[];
};

export const mapVariationAttributeValue = (data: any): VariationAttributeValueModel => ({
  id: typeof data?.id === 'number' ? data.id : null,
  productId: typeof data?.productId === 'number' ? data.productId : null,
  attributeId: typeof data?.attributeId === 'number' ? data.attributeId : null,
  value: typeof data?.value === 'string' ? data.value : null,
  isVariation: typeof data?.isVariation === 'number' ? data.isVariation : null,
  createdAt: typeof data?.createdAt === 'string' ? data.createdAt : null,
  updatedAt: typeof data?.updatedAt === 'string' ? data.updatedAt : null,
});

export const mapVariationAttributeValues = (data: any): VariationAttributeValueModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapVariationAttributeValue);
};

export const mapVariationAttribute = (data: any): VariationAttributeModel => ({
  id: typeof data?.id === 'number' ? data.id : null,
  displayName:
    typeof data?.displayName === 'string'
      ? data.displayName
      : typeof data?.display_name === 'string'
        ? data.display_name
        : null,
  type: typeof data?.type === 'number' ? data.type : null,
  unit: typeof data?.unit === 'string' ? data.unit : null,
  values: mapVariationAttributeValues(data?.values),
});

export const mapVariationAttributes = (data: any): VariationAttributeModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapVariationAttribute);
};
