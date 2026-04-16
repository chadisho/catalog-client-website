import Link from 'next/link';
import {
  getCatalogTranslations,
  type CatalogLocale,
} from '../../../core/i18n/catalogLocale';
import type { OrderModel } from '../model/orderModel';
import OrderItemRow from './OrderItemRow';
import {
  formatOrderDateTime,
  formatOrderTotalAmount,
} from './ordersListFormatters';

type OrdersListItemTranslations = ReturnType<typeof getCatalogTranslations>;

type OrdersListItemProps = {
  locale: CatalogLocale;
  order: OrderModel;
  t: OrdersListItemTranslations;
};

function getOrderStatusLabel(
  orderStatus: OrderModel['status'],
  t: OrdersListItemTranslations
): string {
  if (orderStatus === 'pending') {
    return t.orderStatusPending;
  }

  if (orderStatus === 'completed') {
    return t.orderStatusCompleted;
  }

  if (orderStatus === 'canceled') {
    return t.orderStatusCanceled;
  }

  if (orderStatus === 'returned') {
    return t.orderStatusReturned;
  }

  return t.orderStatusUnknown;
}

function getOrderStatusItemClasses(orderStatus: OrderModel['status']): string {
  if (orderStatus === 'pending') {
    return 'border-warning bg-[color:color-mix(in_oklab,var(--color-warning)_14%,var(--color-surface))]';
  }

  if (orderStatus === 'completed') {
    return 'border-success bg-[color:color-mix(in_oklab,var(--color-success)_14%,var(--color-surface))]';
  }

  if (orderStatus === 'canceled') {
    return 'border-danger bg-[color:color-mix(in_oklab,var(--color-error)_14%,var(--color-surface))]';
  }

  if (orderStatus === 'returned') {
    return 'border-secondary bg-[color:color-mix(in_oklab,var(--color-secondary)_12%,var(--color-surface))]';
  }

  return 'border-border bg-background';
}

export default function OrdersListItem({ locale, order, t }: OrdersListItemProps) {
  const content = (
    <>
      <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="text-text/50">{t.orderCode}</p>
          <p className="mt-1 font-medium text-text">{order.code || '-'}</p>
        </div>
        <div>
          <p className="text-text/70">{t.orderStatus}</p>
          <p className="mt-1 font-medium text-text">{getOrderStatusLabel(order.status, t)}</p>
        </div>
        <div>
          <p className="text-text/70">{t.orderDate}</p>
          <p className="mt-1 font-medium text-text">{formatOrderDateTime(locale, order.createdAt)}</p>
        </div>
        <div>
          <p className="text-text/70">{t.orderTotalAmount}</p>
          <p className="mt-1 font-medium text-text">
            {formatOrderTotalAmount(locale, order.totalAmount, order.orderItems[0]?.currency || 'toman')}
          </p>
        </div>
        <div>
          <p className="text-text/70">{t.orderItemsCount}</p>
          <p className="mt-1 font-medium text-text">{order.orderItemCount}</p>
        </div>
      </div>

      {order.orderItems.length > 0 ? (
        <ul className="mt-4 space-y-2 border-t border-border pt-3">
          {order.orderItems.map((item) => (
            <li key={item.id ?? `${order.code}-${item.productId ?? item.productName}`}>
              <OrderItemRow locale={locale} item={item} fallbackTitle={t.orderProductFallback} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  return (
    <article
      className={`rounded-xl border p-4 transition-colors ${getOrderStatusItemClasses(order.status)} ${
        order.orderId ? 'hover:bg-muted/30' : ''
      }`}
    >
      {order.orderId ? (
        <Link
          href={`/profile/orders/${order.orderId}`}
          className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}
