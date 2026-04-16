"use client";

import { useEffect } from 'react';
import {
  getCatalogDirection,
  getCatalogTranslations,
  type CatalogLocale,
} from '../../../core/i18n/catalogLocale';
import ErrorState from '../../../core/components/feedback/ErrorState';
import type { OrdersListModel } from '../model/orderModel';
import OrdersListItem from './OrdersListItem';
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
                <OrdersListItem key={order.orderId ?? order.code} locale={locale} order={order} t={t} />
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
