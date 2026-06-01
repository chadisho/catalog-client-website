import { create } from 'zustand';
import {
  addToCart as addToCartRequest,
  deleteCartItem as deleteCartItemRequest,
  getCart,
  getUserCarts as getUserCartsRequest,
  updateCartItemQuantity as updateCartItemQuantityRequest,
} from '../api/cartApi';
import type { CartModel, UserCartSummaryModel } from '../model/cartModel';

type CartStatus = 'idle' | 'syncing' | 'ready' | 'error';
type CartErrorType = 'FETCH' | 'ADD' | 'UPDATE' | 'DELETE' | null;

type AddToCartInput = {
  productId: number;
  variationId?: number;
  quantity: number;
  catalogId?: number;
  shopId?: number;
};

type CartStore = {
  cart: CartModel | null;
  userCarts: UserCartSummaryModel[];
  activeShopId: number | null;
  status: CartStatus;
  errorType: CartErrorType;
  pendingByItemId: Record<number, true>;
  isAddPending: boolean;
  hasHydrated: boolean;
  hasFetchedOnce: boolean;
  hydrate: () => void;
  clearError: () => void;
  resetCart: () => void;
  fetchCart: (shopId?: number) => Promise<void>;
  prefetchCartIfNeeded: (shopId?: number) => Promise<void>;
  addToCart: (input: AddToCartInput) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  fetchUserCarts: () => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  userCarts: [],
  activeShopId: null,
  status: 'idle',
  errorType: null,
  pendingByItemId: {},
  isAddPending: false,
  hasHydrated: false,
  hasFetchedOnce: false,

  hydrate: () => {
    set({ hasHydrated: true });
  },

  clearError: () => {
    set({ errorType: null });
  },

  resetCart: () => {
    set({
      cart: null,
      userCarts: [],
      activeShopId: null,
      status: 'idle',
      errorType: null,
      pendingByItemId: {},
      isAddPending: false,
      hasFetchedOnce: false,
    });
  },

  fetchCart: async (shopId?: number) => {
    set({ status: 'syncing', errorType: null });

    try {
      const cart = await getCart(shopId);
      set({ cart, status: 'ready', hasFetchedOnce: true, activeShopId: shopId ?? null });
    } catch (error) {
      set({ status: 'error', errorType: 'FETCH' });
      throw error;
    }
  },

  prefetchCartIfNeeded: async (shopId?: number) => {
    const state = get();
    if (state.status === 'syncing' || state.hasFetchedOnce) {
      return;
    }

    await state.fetchCart(shopId);
  },

  addToCart: async (input) => {
    set({ isAddPending: true, errorType: null });

    try {
      await addToCartRequest(input);
      await get().fetchCart(input.shopId);
    } catch (error) {
      set({ errorType: 'ADD' });
      throw error;
    } finally {
      set({ isAddPending: false });
    }
  },

  updateQuantity: async (itemId, quantity) => {
    if (quantity < 1) {
      return;
    }

    set((state) => ({
      pendingByItemId: {
        ...state.pendingByItemId,
        [itemId]: true,
      },
      errorType: null,
    }));

    try {
      await updateCartItemQuantityRequest({
        itemId,
        quantity,
      });

      await get().fetchCart(get().activeShopId ?? undefined);
    } catch (error) {
      set({ errorType: 'UPDATE' });
      throw error;
    } finally {
      set((state) => {
        const nextPending = { ...state.pendingByItemId };
        delete nextPending[itemId];

        return {
          pendingByItemId: nextPending,
        };
      });
    }
  },

  removeItem: async (itemId) => {
    set((state) => ({
      pendingByItemId: {
        ...state.pendingByItemId,
        [itemId]: true,
      },
      errorType: null,
    }));

    try {
      await deleteCartItemRequest(itemId);
      await get().fetchCart(get().activeShopId ?? undefined);
    } catch (error) {
      set({ errorType: 'DELETE' });
      throw error;
    } finally {
      set((state) => {
        const nextPending = { ...state.pendingByItemId };
        delete nextPending[itemId];

        return {
          pendingByItemId: nextPending,
        };
      });
    }
  },

  fetchUserCarts: async () => {
    try {
      const userCarts = await getUserCartsRequest();
      set({ userCarts });
    } catch {
      set({ userCarts: [] });
    }
  },
}));
