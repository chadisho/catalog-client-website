import { create } from 'zustand';
import {
  addToCart as addToCartRequest,
  deleteCartItem as deleteCartItemRequest,
  getCart,
  updateCartItemQuantity as updateCartItemQuantityRequest,
} from '../api/cartApi';
import type { CartModel } from '../model/cartModel';

type CartStatus = 'idle' | 'syncing' | 'ready' | 'error';
type CartErrorType = 'FETCH' | 'ADD' | 'UPDATE' | 'DELETE' | null;

type AddToCartInput = {
  productId: number;
  variationId?: number;
  quantity: number;
  catalogId?: number;
};

type CartStore = {
  cart: CartModel | null;
  status: CartStatus;
  errorType: CartErrorType;
  pendingByItemId: Record<number, true>;
  isAddPending: boolean;
  hasHydrated: boolean;
  hasFetchedOnce: boolean;
  hydrate: () => void;
  clearError: () => void;
  resetCart: () => void;
  fetchCart: () => Promise<void>;
  prefetchCartIfNeeded: () => Promise<void>;
  addToCart: (input: AddToCartInput) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
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
      status: 'idle',
      errorType: null,
      pendingByItemId: {},
      isAddPending: false,
      hasFetchedOnce: false,
    });
  },

  fetchCart: async () => {
    set({ status: 'syncing', errorType: null });

    try {
      const cart = await getCart();
      set({ cart, status: 'ready', hasFetchedOnce: true });
    } catch (error) {
      set({ status: 'error', errorType: 'FETCH' });
      throw error;
    }
  },

  prefetchCartIfNeeded: async () => {
    const state = get();
    if (state.status === 'syncing' || state.hasFetchedOnce) {
      return;
    }

    await state.fetchCart();
  },

  addToCart: async (input) => {
    set({ isAddPending: true, errorType: null });

    try {
      await addToCartRequest(input);
      await get().fetchCart();
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

      await get().fetchCart();
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
      await get().fetchCart();
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
}));
