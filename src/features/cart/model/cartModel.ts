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
  productId?: number;
  variationId?: number | null;
  quantity?: number;
  price?: string;
  subtotal?: string;
  createdAt?: string;
  updatedAt?: string;
  productName?: string;
  currency?: string;
  productImage?: string;
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
  variationId: number | null;
  quantity: number;
  price: string | null;
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

function mapCartItem(source: CartApiItem): CartItemModel {
  return {
    id: typeof source?.id === 'number' ? source.id : null,
    requestId: typeof source?.requestId === 'number' ? source.requestId : null,
    productId: typeof source?.productId === 'number' ? source.productId : null,
    variationId: typeof source?.variationId === 'number' ? source.variationId : null,
    quantity: typeof source?.quantity === 'number' ? source.quantity : 1,
    price: typeof source?.price === 'string' ? source.price : null,
    subtotal: typeof source?.subtotal === 'string' ? source.subtotal : null,
    createdAt: typeof source?.createdAt === 'string' ? source.createdAt : null,
    updatedAt: typeof source?.updatedAt === 'string' ? source.updatedAt : null,
    productName: typeof source?.productName === 'string' ? source.productName : null,
    currency: typeof source?.currency === 'string' ? source.currency : 'toman',
    productImage: typeof source?.productImage === 'string' ? source.productImage : null,
    unit: typeof source?.unit === 'string' ? source.unit : null,
    productVariations: Array.isArray(source?.productVariations)
      ? source.productVariations.map(mapCartAttr)
      : [],
    productPrice: mapCartProductPrice(source?.productPrice),
    uri: typeof source?.uri === 'string' ? source.uri : null,
  };
}

export function mapCart(source: CartApiResponse): CartModel {
  return {
    id: typeof source?.id === 'number' ? source.id : null,
    code: typeof source?.code === 'string' ? source.code : null,
    totalAmount: typeof source?.totalAmount === 'string' ? source.totalAmount : null,
    status: typeof source?.status === 'string' ? source.status : null,
    getFrom: typeof source?.getFrom === 'string' ? source.getFrom : null,
    paymentStatus: typeof source?.paymentStatus === 'string' ? source.paymentStatus : null,
    paymentType: typeof source?.paymentType === 'string' ? source.paymentType : null,
    listProducts: Array.isArray(source?.listProducts) ? source.listProducts.map(mapCartItem) : [],
  };
}
