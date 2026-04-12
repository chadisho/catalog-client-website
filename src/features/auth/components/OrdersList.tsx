"use client";

import { useEffect } from 'react';
import {
  getCatalogDirection,
  getCatalogTranslations,
  getLocalizedCurrencyLabel,
  type CatalogLocale,
} from '../../../core/i18n/catalogLocale';
import ErrorState from '../../../core/components/feedback/ErrorState';
import type { OrderModel, OrdersListModel } from '../model/orderModel';
import { useOrdersStore } from '../store/ordersStore';

type OrdersListProps = {
  locale: CatalogLocale;
  initialOrdersList: OrdersListModel;
};

function getVisiblePages(currentPage: number, lastPage: number): number[] {
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);
  const start = Math.max(1, currentPage - half);
  const end = Math.min(lastPage, start + maxVisible - 1);
  const adjustedStart = Math.max(1, end - maxVisible + 1);

  return Array.from({ length: end - adjustedStart + 1 }, (_, index) => adjustedStart + index);
}

function getOrderStatusLabel(orderStatus: OrderModel['status'], t: ReturnType<typeof getCatalogTranslations>): string {
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

export default function OrdersList({ locale, initialOrdersList }: OrdersListProps) {
  const t = getCatalogTranslations(locale);
  const direction = getCatalogDirection(locale);
  const status = useOrdersStore((state) => state.status);
  const ordersList = useOrdersStore((state) => state.ordersList);
  const currentPage = useOrdersStore((state) => state.currentPage);
  const hydrate = useOrdersStore((state) => state.hydrate);
  const goToPage = useOrdersStore((state) => state.goToPage);

  useEffect(() => {
    hydrate(initialOrdersList);
  }, [hydrate, initialOrdersList]);

  if (status === 'error') {
    return <ErrorState locale={locale} />;
  }

  const resolvedOrdersList = ordersList ?? initialOrdersList;
  const isLoading = status === 'loading';
  const visiblePages = getVisiblePages(
    Math.max(resolvedOrdersList.currentPage, currentPage),
    Math.max(resolvedOrdersList.lastPage, 1)
  );

  return (
    <main dir={direction} className="mx-auto w-full max-w-[980px] px-4 py-6">
      <section className="rounded-2xl  bg-background p-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold text-text">{t.ordersPageTitle}</h1>
          {isLoading ? <span className="text-xs text-text/70">{t.loading}</span> : null}
        </div>

        {resolvedOrdersList.orders.length === 0 ? (
          <div className="mt-5">
            <p className="text-sm font-medium text-text">{t.ordersEmptyTitle}</p>
            <p className="mt-1 text-sm text-text/75">{t.ordersEmptyDescription}</p>
          </div>
        ) : (
          <>
            <div className="mt-5 space-y-4">
              {resolvedOrdersList.orders.map((order) => (
                <article
                  key={order.orderId ?? order.code}
                  className={`rounded-xl border p-4 ${getOrderStatusItemClasses(order.status)}`}
                >
                  <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                      <p className="text-text/65">{t.orderCode}</p>
                      <p className="mt-1 font-medium text-text">{order.code || '-'}</p>
                    </div>
                    <div>
                      <p className="text-text/65">{t.orderStatus}</p>
                      <p className="mt-1 font-medium text-text">{getOrderStatusLabel(order.status, t)}</p>
                    </div>
                    <div>
                      <p className="text-text/65">{t.orderDate}</p>
                      <p className="mt-1 font-medium text-text">{order.createdAt || '-'}</p>
                    </div>
                    <div>
                      <p className="text-text/65">{t.orderTotalAmount}</p>
                      <p className="mt-1 font-medium text-text">
                        {order.totalAmount
                          ? `${order.totalAmount} ${getLocalizedCurrencyLabel(
                              order.orderItems[0]?.currency || 'toman',
                              locale
                            )}`
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-text/65">{t.orderItemsCount}</p>
                      <p className="mt-1 font-medium text-text">{order.orderItemCount}</p>
                    </div>
                  </div>

                  {order.orderItems.length > 0 ? (
                    <ul className="mt-4 space-y-2 border-t border-border pt-3">
                      {order.orderItems.map((item) => (
                        <li key={item.id ?? `${order.code}-${item.productId ?? item.productName}`}>
                          <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-background px-3 py-2">
                            {item.productImage ? (
                              <img
                                src={item.productImage}
                                alt={item.productName || t.orderProductFallback}
                                className="h-12 w-12 rounded-md border border-border object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-md border border-border bg-muted" aria-hidden />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-text">
                                {item.productName || t.orderProductFallback}
                              </p>
                              <p className="mt-0.5 text-xs text-text/70">
                                {item.quantity} × {item.price || '-'}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>

            {resolvedOrdersList.lastPage > 1 ? (
              <nav className="mt-6 flex items-center justify-center gap-1" aria-label={t.paginationPageLabel}>
                <button
                  type="button"
                  onClick={() => void goToPage(resolvedOrdersList.currentPage - 1)}
                  disabled={isLoading || resolvedOrdersList.currentPage <= 1}
                  className="h-9 rounded-lg border border-border px-3 text-sm text-text disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.paginationPrevious}
                </button>

                {visiblePages.map((pageNumber) => {
                  const isActive = pageNumber === resolvedOrdersList.currentPage;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => void goToPage(pageNumber)}
                      disabled={isLoading}
                      className={`h-9 min-w-9 rounded-lg border px-3 text-sm ${
                        isActive
                          ? 'border-primary bg-primary text-primary-content'
                          : 'border-border text-text hover:bg-muted'
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => void goToPage(resolvedOrdersList.currentPage + 1)}
                  disabled={isLoading || resolvedOrdersList.currentPage >= resolvedOrdersList.lastPage}
                  className="h-9 rounded-lg border border-border px-3 text-sm text-text disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.paginationNext}
                </button>
              </nav>
            ) : null}
          </>
        )}
      </section>
    </main>
  );
}
