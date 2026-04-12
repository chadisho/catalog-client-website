import { mapOrder, type OrderModel } from './orderModel';

type OrderProductVariationAttributeApi = {
  id?: unknown;
  displayName?: unknown;
  display_name?: unknown;
  type?: unknown;
  unit?: unknown;
};

type OrderProductVariationApi = {
  attributeId?: unknown;
  attribute_id?: unknown;
  value?: unknown;
  attribute?: unknown;
};

type OrderProductDetailsApi = {
  id?: unknown;
  requestId?: unknown;
  request_id?: unknown;
  productId?: unknown;
  product_id?: unknown;
  variationId?: unknown;
  variation_id?: unknown;
  quantity?: unknown;
  price?: unknown;
  currency?: unknown;
  subtotal?: unknown;
  catalogId?: unknown;
  catalog_id?: unknown;
  createdAt?: unknown;
  created_at?: unknown;
  updatedAt?: unknown;
  updated_at?: unknown;
  productName?: unknown;
  product_name?: unknown;
  productImage?: unknown;
  product_image?: unknown;
  productVariation?: unknown;
  product_variation?: unknown;
  makingDuration?: unknown;
  making_duration?: unknown;
  onlineSaleQuantity?: unknown;
  online_sale_quantity?: unknown;
};

export type OrderProductVariationAttributeModel = {
  id: number | null;
  displayName: string;
  type: number | null;
  unit: string;
};

export type OrderProductVariationModel = {
  attributeId: number | null;
  value: string;
  attribute: OrderProductVariationAttributeModel | null;
};

export type OrderDetails = {
  order: OrderModel;
  orderItems: OrderDetailsItemModel[];
};

export type OrderDetailsItemModel = {
  id: number | null;
  requestId: number | null;
  productId: number | null;
  variationId: number | null;
  quantity: number;
  price: string;
  currency: string;
  subtotal: string;
  catalogId: number | null;
  createdAt: string;
  updatedAt: string;
  productName: string;
  productImage: string;
  productVariation: OrderProductVariationModel[];
  makingDuration: string;
  onlineSaleQuantity: number;
};

function toSafeString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function toSafeNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function toSafeNullableNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function mapOrderVariationAttribute(source: unknown): OrderProductVariationAttributeModel | null {
  if (!source || typeof source !== 'object') {
    return null;
  }

  const item = source as OrderProductVariationAttributeApi;

  return {
    id: toSafeNullableNumber(item.id),
    displayName: toSafeString(item.displayName ?? item.display_name),
    type: toSafeNullableNumber(item.type),
    unit: toSafeString(item.unit),
  };
}

function mapOrderVariation(source: unknown): OrderProductVariationModel {
  const item = (source ?? {}) as OrderProductVariationApi;

  return {
    attributeId: toSafeNullableNumber(item.attributeId ?? item.attribute_id),
    value: toSafeString(item.value),
    attribute: mapOrderVariationAttribute(item.attribute),
  };
}

function mapOrderVariations(data: unknown): OrderProductVariationModel[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapOrderVariation);
}

function mapOrderDetailsItem(data: unknown): OrderDetailsItemModel {
  const source = (data ?? {}) as OrderProductDetailsApi;

  return {
    id: toSafeNullableNumber(source.id),
    requestId: toSafeNullableNumber(source.requestId ?? source.request_id),
    productId: toSafeNullableNumber(source.productId ?? source.product_id),
    variationId: toSafeNullableNumber(source.variationId ?? source.variation_id),
    quantity: toSafeNumber(source.quantity),
    price: toSafeString(source.price),
    currency: toSafeString(source.currency),
    subtotal: toSafeString(source.subtotal),
    catalogId: toSafeNullableNumber(source.catalogId ?? source.catalog_id),
    createdAt: toSafeString(source.createdAt ?? source.created_at),
    updatedAt: toSafeString(source.updatedAt ?? source.updated_at),
    productName: toSafeString(source.productName ?? source.product_name),
    productImage: toSafeString(source.productImage ?? source.product_image),
    productVariation: mapOrderVariations(source.productVariation ?? source.product_variation),
    makingDuration: toSafeString(source.makingDuration ?? source.making_duration),
    onlineSaleQuantity: toSafeNumber(source.onlineSaleQuantity ?? source.online_sale_quantity),
  };
}

export function mapOrderDetailsResponse(response: any): OrderDetails {
  const optionsSource =
    typeof response === 'object' && response && 'options' in response
      ? ((response as { options?: unknown }).options ?? {})
      : {};

  const options = optionsSource as { order?: unknown; order_items?: unknown };

  return {
    order: mapOrder(options.order),
    orderItems: Array.isArray(options.order_items) ? options.order_items.map(mapOrderDetailsItem) : [],
  };
}
