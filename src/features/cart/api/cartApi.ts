import { mapCart, type CartModel } from '../model/cartModel';

type AddToCartInput = {
  productId: number;
  variationId?: number;
  quantity: number;
  catalogId?: number;
};

type UpdateCartItemInput = {
  itemId: number;
  quantity: number;
};

const MOCK_CART_RESPONSE = {
  id: 501,
  code: 'CRT-501',
  totalAmount: '19200000',
  status: 'active',
  getFrom: 'catalog',
  paymentStatus: 'pending',
  paymentType: 'online',
  listProducts: [
    {
      id: 9001,
      requestId: 78001,
      productId: 101,
      variationId: 1,
      quantity: 14,
      price: '345000',
      subtotal: '4830000',
      createdAt: '2026-04-01T10:00:00Z',
      updatedAt: '2026-04-01T10:00:00Z',
      productName: 'محصولی با تعداد محدود',
      currency: 'toman',
      productImage: '/favicon.svg',
      unit: 'عدد',
      productVariations: [
        {
          attributeId: 1,
          value: 'Large',
          attribute: { id: 1, displayName: 'سایز', type: 1, unit: '' },
        },
        {
          attributeId: 2,
          value: 'قرمز',
          attribute: { id: 2, displayName: 'رنگ', type: 1, unit: '' },
        },
      ],
      productPrice: { price: '345000', salePrice: '312450' },
      uri: '/product/chp-101/product-101',
    },
    {
      id: 9002,
      requestId: 78002,
      productId: 101,
      variationId: 2,
      quantity: 11,
      price: '345000',
      subtotal: '3795000',
      createdAt: '2026-04-01T10:00:00Z',
      updatedAt: '2026-04-01T10:00:00Z',
      productName: 'محصولی با تعداد محدود',
      currency: 'toman',
      productImage: '/favicon.svg',
      unit: 'عدد',
      productVariations: [
        {
          attributeId: 1,
          value: 'Large',
          attribute: { id: 1, displayName: 'سایز', type: 1, unit: '' },
        },
        {
          attributeId: 2,
          value: 'آبی',
          attribute: { id: 2, displayName: 'رنگ', type: 1, unit: '' },
        },
      ],
      productPrice: { price: '345000', salePrice: '312450' },
      uri: '/product/chp-101/product-101',
    },
    {
      id: 9003,
      requestId: 78003,
      productId: 101,
      variationId: 3,
      quantity: 6,
      price: '345000',
      subtotal: '2070000',
      createdAt: '2026-04-01T10:00:00Z',
      updatedAt: '2026-04-01T10:00:00Z',
      productName: 'محصولی با تعداد محدود',
      currency: 'toman',
      productImage: '/favicon.svg',
      unit: 'عدد',
      productVariations: [
        {
          attributeId: 1,
          value: 'XXL',
          attribute: { id: 1, displayName: 'سایز', type: 1, unit: '' },
        },
        {
          attributeId: 2,
          value: 'قرمز',
          attribute: { id: 2, displayName: 'رنگ', type: 1, unit: '' },
        },
      ],
      productPrice: { price: '345000', salePrice: '312450' },
      uri: '/product/chp-101/product-101',
    },
    {
      id: 9010,
      requestId: 78010,
      productId: 205,
      variationId: 8,
      quantity: 14,
      price: '345000',
      subtotal: '4830000',
      createdAt: '2026-04-01T10:00:00Z',
      updatedAt: '2026-04-01T10:00:00Z',
      productName: 'محصول تنها با یک متغیر',
      currency: 'toman',
      productImage: '/favicon.svg',
      unit: 'عدد',
      productVariations: [
        {
          attributeId: 3,
          value: 'ساعت 8 / مشکی',
          attribute: { id: 3, displayName: 'مدل', type: 1, unit: '' },
        },
      ],
      productPrice: { price: '345000', salePrice: '312450' },
      uri: '/product/chp-205/product-205',
    },
    {
      id: 9020,
      requestId: 78020,
      productId: 306,
      variationId: null,
      quantity: 14,
      price: '345000',
      subtotal: '4830000',
      createdAt: '2026-04-01T10:00:00Z',
      updatedAt: '2026-04-01T10:00:00Z',
      productName: 'محصول بسته',
      currency: 'toman',
      productImage: '/favicon.svg',
      unit: 'عدد',
      productVariations: [],
      productPrice: { price: '345000', salePrice: '312450' },
      uri: '/product/chp-306/product-306',
    },
  ],
};

export async function getCart(): Promise<CartModel> {
  return mapCart(MOCK_CART_RESPONSE);
}

export async function addToCart(_input: AddToCartInput): Promise<string> {
  return 'ok';
}

export async function updateCartItemQuantity(_input: UpdateCartItemInput): Promise<void> {
  return;
}

export async function deleteCartItem(_itemId: number): Promise<void> {
  return;
}

export async function createOrderFromCart(_cartId: number): Promise<{ orderCode: string }> {
  return { orderCode: 'MOCK-ORDER-1001' };
}
