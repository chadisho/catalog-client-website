type OrderProductApi = {
  id?: unknown;
  productId?: unknown;
  product_id?: unknown;
  quantity?: unknown;
  price?: unknown;
  subtotal?: unknown;
  currency?: unknown;
  productName?: unknown;
  product_name?: unknown;
  productImage?: unknown;
  product_image?: unknown;
};

type OrderApi = {
  orderId?: unknown;
  order_id?: unknown;
  code?: unknown;
  totalAmount?: unknown;
  total_amount?: unknown;
  status?: unknown;
  quantity?: unknown;
  createdAt?: unknown;
  created_at?: unknown;
  order_items_count?: unknown;
  orderItems?: unknown;
  order_items?: unknown;
};

type OrdersPaginationApi = {
  data?: unknown;
  currentPage?: unknown;
  current_page?: unknown;
  lastPage?: unknown;
  last_page?: unknown;
  total?: unknown;
};

type OrdersListApiOptions = {
  orders?: OrdersPaginationApi;
  data?: unknown;
  currentPage?: unknown;
  current_page?: unknown;
  lastPage?: unknown;
  last_page?: unknown;
  total?: unknown;
};

export type OrdersListApiResponse = {
  options?: OrdersListApiOptions;
  orders?: OrdersPaginationApi;
  data?: unknown;
  currentPage?: unknown;
  current_page?: unknown;
  lastPage?: unknown;
  last_page?: unknown;
  total?: unknown;
};

export type OrderItemModel = {
  id: number | null;
  productId: number | null;
  quantity: number;
  price: string;
  subtotal: string;
  currency: string;
  productName: string;
  productImage: string;
};

export type OrderModel = {
  orderId: number | null;
  code: string;
  totalAmount: string;
  status: 'pending' | 'completed' | 'canceled' | 'returned' | 'unknown';
  quantity: number;
  createdAt: string;
  orderItemCount: number;
  orderItems: OrderItemModel[];
};

export type OrdersListModel = {
  currentPage: number;
  lastPage: number;
  total: number;
  orders: OrderModel[];
};

function toSafeString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function toSafeNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function toSafeNullableNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function normalizeOrderStatus(value: unknown): OrderModel['status'] {
  if (typeof value !== 'string') {
    return 'unknown';
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === 'pending') {
    return 'pending';
  }

  if (normalized === 'completed') {
    return 'completed';
  }

  if (normalized === 'canceled') {
    return 'canceled';
  }

  if (normalized === 'returned') {
    return 'returned';
  }

  return 'unknown';
}

function mapOrderItem(data: unknown): OrderItemModel {
  const source = (data ?? {}) as OrderProductApi;

  return {
    id: toSafeNullableNumber(source.id),
    productId: toSafeNullableNumber(source.productId ?? source.product_id),
    quantity: toSafeNumber(source.quantity),
    price: toSafeString(source.price),
    subtotal: toSafeString(source.subtotal),
    currency: toSafeString(source.currency),
    productName: toSafeString(source.productName ?? source.product_name),
    productImage: toSafeString(source.productImage ?? source.product_image),
  };
}

function mapOrderItems(data: unknown): OrderItemModel[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapOrderItem);
}

function mapOrder(data: unknown): OrderModel {
  const source = (data ?? {}) as OrderApi;

  return {
    orderId: toSafeNullableNumber(source.orderId ?? source.order_id),
    code: toSafeString(source.code),
    totalAmount: toSafeString(source.totalAmount ?? source.total_amount),
    status: normalizeOrderStatus(source.status),
    quantity: toSafeNumber(source.quantity),
    createdAt: toSafeString(source.createdAt ?? source.created_at),
    orderItemCount: toSafeNumber(source.order_items_count),
    orderItems: mapOrderItems(source.orderItems ?? source.order_items),
  };
}

function mapOrders(data: unknown): OrderModel[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapOrder);
}

function mapPagination(source: OrdersPaginationApi): Pick<OrdersListModel, 'currentPage' | 'lastPage' | 'total'> {
  return {
    currentPage: toSafeNumber(source.currentPage ?? source.current_page),
    lastPage: toSafeNumber(source.lastPage ?? source.last_page),
    total: toSafeNumber(source.total),
  };
}

export function mapOrdersListResponse(response: OrdersListApiResponse): OrdersListModel {
  const options = response.options;
  const source = options?.orders ?? response.orders ?? options ?? response;

  return {
    ...mapPagination(source),
    orders: mapOrders(source.data),
  };
}