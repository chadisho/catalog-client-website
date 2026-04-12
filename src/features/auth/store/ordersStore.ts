import { create } from 'zustand';
import { getOrdersList } from '../api/orderApi';
import type { OrdersListModel } from '../model/orderModel';

type OrdersStatus = 'idle' | 'loading' | 'ready' | 'error';

type OrdersStore = {
  status: OrdersStatus;
  ordersList: OrdersListModel | null;
  currentPage: number;
  hydrate: (initialOrdersList: OrdersListModel) => void;
  goToPage: (page: number) => Promise<void>;
};

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  status: 'idle',
  ordersList: null,
  currentPage: 1,

  hydrate: (initialOrdersList) => {
    set({
      ordersList: initialOrdersList,
      currentPage: initialOrdersList.currentPage || 1,
      status: 'ready',
    });
  },

  goToPage: async (page) => {
    const state = get();
    const lastPage = state.ordersList?.lastPage ?? 1;
    const nextPage = Math.min(Math.max(page, 1), Math.max(lastPage, 1));

    if (state.status === 'loading' || state.currentPage === nextPage) {
      return;
    }

    set({ status: 'loading' });

    try {
      const ordersList = await getOrdersList(nextPage);
      set({
        ordersList,
        currentPage: ordersList.currentPage || nextPage,
        status: 'ready',
      });
    } catch (error) {
      set({ status: 'error' });
      throw error;
    }
  },
}));
