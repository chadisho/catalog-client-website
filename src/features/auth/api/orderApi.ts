import { apiClient } from '../../../core/api';
import {
  mapOrdersListResponse,
  type OrdersListApiResponse,
  type OrdersListModel,
} from '../model/orderModel';

export async function getOrdersList(page = 1): Promise<OrdersListModel> {
  const response = (await apiClient(`app/orders/index?page=${page}`, {
    method: 'POST',
  })) as OrdersListApiResponse;

  return mapOrdersListResponse(response);
}
