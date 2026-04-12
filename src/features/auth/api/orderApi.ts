import { apiClient } from '../../../core/api';
import {
  mapOrdersListResponse,
  type OrdersListApiResponse,
  type OrdersListModel,
} from '../model/orderModel';
import {
  mapOrderDetailsResponse,
  type OrderDetails,
} from '../model/orderDetailsModel';

export async function getOrdersList(page = 1): Promise<OrdersListModel> {
  const response = (await apiClient(`app/orders/index?page=${page}`, {
    method: 'POST',
  })) as OrdersListApiResponse;

  return mapOrdersListResponse(response);
}

export async function getOrderDetails(orderId: number): Promise<OrderDetails> {
  const response = await apiClient(`app/orders/show/${orderId}`, {
    method: 'POST',
  });

  return mapOrderDetailsResponse(response);
}
