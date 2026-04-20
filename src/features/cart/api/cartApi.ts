import { apiClient } from '../../../core/api';
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

export async function getCart(): Promise<CartModel> {
    const response = await apiClient('app/cart', {
      method: 'POST',
    });
       console.log("CCA");
    console.log(response);
    return mapCart(response );
 
}

export async function addToCart(input: AddToCartInput): Promise<string> {
  const query = buildQuery({
    product_id: input.productId,
    variation_id: input.variationId,
    quantity: input.quantity,
    catalog_id: input.catalogId,
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

export async function createOrderFromCart(cartId: number): Promise<{ orderCode: string }> {
  const response = (await apiClient(`app/orders/new-order/${cartId}`, {
    method: 'POST',
  })) as OrderResponse;

  return { orderCode: response.orderCode??response.options?.orderCode ?? '' };
}
