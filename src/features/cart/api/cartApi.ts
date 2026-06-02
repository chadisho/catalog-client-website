import { apiClient } from '../../../core/api';
import { mapCart, mapUserCarts, type CartModel, type UserCartSummaryModel } from '../model/cartModel';

type AddToCartInput = {
  productId: number;
  variationId?: number;
  quantity: number;
  catalogId?: number;
  shopId?: number;
};

type UpdateCartItemInput = {
  itemId: number;
  quantity: number;
};

type OrderResponse = {
    options: { orderCode?: string;},
  orderCode?: string;
};

function buildQuery(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export async function getCart(shopId?: number): Promise<CartModel> {
  const query = buildQuery({ shop_id: shopId });
  const response = await apiClient(`app/cart${query}`, {
    method: 'POST',
  });
  return mapCart(response);
}

export async function getUserCarts(): Promise<UserCartSummaryModel[]> {
  const response = await apiClient('app/cart/user-carts', {
    method: 'POST',
  });
  return mapUserCarts(response);
}

export async function addToCart(input: AddToCartInput): Promise<string> {
  const query = buildQuery({
    product_id: input.productId,
    variation_id: input.variationId,
    quantity: input.quantity,
    catalog_id: input.catalogId,
    shop_id: input.shopId,
  });

  const response = await apiClient(`app/cart/add-to-cart${query}`, {
    method: 'POST',
  });

  return typeof response === 'string' ? response : 'ok';
}

export async function updateCartItemQuantity(input: UpdateCartItemInput): Promise<void> {
  const query = buildQuery({ quantity: input.quantity });

  await apiClient(`app/cart/update-cart-item/${input.itemId}${query}`, {
    method: 'POST',
  });
}

export async function deleteCartItem(itemId: number): Promise<void> {
  await apiClient(`app/cart/delete-cart-item/${itemId}`, {
    method: 'POST',
  });
}

export async function createOrderFromCart(
  cartId: number,
  addressId?: number
): Promise<{ orderCode: string }> {
    const body = addressId ? JSON.stringify({ address_id: addressId ,cart_id:cartId,}) : undefined;
  const response = (await apiClient(`app/orders/new-order`, {
    method: 'POST',
    body,
  })) as OrderResponse;

  return { orderCode: response.orderCode??response.options?.orderCode ?? '' };
}
