type CartApiAttribute = {
  id?: number;
  displayName?: string;
  type?: number;
  unit?: string;
};

type CartApiAttr = {
  attributeId?: number;
  value?: string;
  attribute?: CartApiAttribute;
};

type CartApiProductPrice = {
  price?: string;
  salePrice?: string;
};

type CartApiItem = {
  id?: number;
  requestId?: number;
  product_id?: number;
  variationId?: number | null;
  quantity?: number;
 
  subtotal?: string;
  createdAt?: string;
  updatedAt?: string;
  product_name?: string;
  currency?: string;
  product_image?: string;
  unit?: string;
  productVariations?: CartApiAttr[];
  productPrice?: CartApiProductPrice;
  uri?: string;
};

type CartApiResponse = {
  id?: number;
  code?: string;
  totalAmount?: string;
  status?: string;
  getFrom?: string;
  paymentStatus?: string;
  paymentType?: string;
  listProducts?: CartApiItem[];
};

export type CartVariationAttributeModel = {
  id: number | null;
  displayName: string | null;
  type: number | null;
  unit: string | null;
};

export type CartAttrModel = {
  attributeId: number | null;
  value: string | null;
  attribute?: CartVariationAttributeModel;
};

export type CartProductPriceModel = {
  price: string | null;
  salePrice: string | null;
};

export type CartItemModel = {
  id: number | null;
  requestId: number | null;
    productId: number | null;
  productCode: string|null
  variationId: number | null;
  quantity: number;
    price: string | null;
   salePrice: string | null;
  subtotal: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  productName: string | null;
  currency: string;
  productImage: string | null;
  unit: string | null;
  productVariations: CartAttrModel[];
  productPrice?: CartProductPriceModel;
  uri: string | null;
};

export type CartModel = {
  id: number | null;
  code: string | null;
  totalAmount: string | null;
  status: string | null;
  getFrom: string | null;
  paymentStatus: string | null;
  paymentType: string | null;
  listProducts: CartItemModel[];
};

function mapCartVariationAttribute(source: CartApiAttribute | undefined): CartVariationAttributeModel {
  return {
    id: typeof source?.id === 'number' ? source.id : null,
    displayName: typeof source?.displayName === 'string' ? source.displayName : null,
    type: typeof source?.type === 'number' ? source.type : null,
    unit: typeof source?.unit === 'string' ? source.unit : null,
  };
}

function mapCartAttr(source: CartApiAttr): CartAttrModel {
  return {
    attributeId: typeof source?.attributeId === 'number' ? source.attributeId : null,
    value: typeof source?.value === 'string' ? source.value : null,
    attribute: source?.attribute ? mapCartVariationAttribute(source.attribute) : undefined,
  };
}

function mapCartProductPrice(source: CartApiProductPrice | undefined): CartProductPriceModel | undefined {
  if (!source) {
    return undefined;
  }

  return {
    price: typeof source.price === 'string' ? source.price : null,
    salePrice: typeof source.salePrice === 'string' ? source.salePrice : null,
  };
}

function mapCartItem(source: any): CartItemModel {
  return {
    id: typeof source?.id === 'number' ? source.id : null,
    requestId: typeof source?.request_id === 'number' ? source.request_id : null,
      productId: typeof source?.product_id === 'number' ? source.product_id : null,
     productCode: typeof source?.product_code === 'number' ? source.product_code : null,
    variationId: typeof source?.variationId === 'number' ? source.variationId : null,
    quantity: typeof source?.quantity === 'number' ? source.quantity : 1,
      price: typeof source?.product_price.price === 'string' ? source?.product_price.price : null,
    salePrice: typeof source?.product_price.sale_price === 'string' ? source?.product_price.sale_price : null,
    subtotal: typeof source?.subtotal === 'string' ? source.subtotal : null,
    createdAt: typeof source?.createdAt === 'string' ? source.createdAt : null,
    updatedAt: typeof source?.updated_at === 'string' ? source.updated_at : null,
    productName: typeof source?.product_name === 'string' ? source.product_name : null,
    currency: typeof source?.currency === 'string' ? source.currency : 'toman',
    productImage: typeof source?.product_image === 'string' ? source.product_image : null,
    unit: typeof source?.unit === 'string' ? source.unit : null,
    productVariations: Array.isArray(source?.product_variation)
      ? source.product_variation.map(mapCartAttr)
      : [],
    productPrice: mapCartProductPrice(source?.productPrice),
    uri: typeof source?.uri === 'string' ? source.uri : null,
  };
}

export function mapCart(json: any): CartModel {
    console.log(json);
    const source = json.options?.cart ?? {};

  return {
    id: typeof source?.id === 'number' ? source.id : null,
    code: typeof source?.code === 'string' ? source.code : null,
    totalAmount: typeof source?.total_amount === 'string' ? source.total_amount : null,
    status: typeof source?.status === 'string' ? source.status : null,
    getFrom: typeof source?.getFrom === 'string' ? source.getFrom : null,
    paymentStatus: typeof source?.paymentStatus === 'string' ? source.paymentStatus : null,
    paymentType: typeof source?.paymentType === 'string' ? source.paymentType : null,
    listProducts: Array.isArray(source?.order_items) ? source.order_items.map(mapCartItem) : [],
  };
}
