import Link from 'next/link';
import Header from '../../../../../core/components/Header';
import ErrorState from '../../../../../core/components/feedback/ErrorState';
import { getCatalogDirection, getCatalogTranslations } from '../../../../../core/i18n/catalogLocale';
import type { AppLocale } from '../../../../../core/i18n/globalLocale';
import { getOrderDetails } from '../../../api/orderApi';
import OrderDetailsItemCard from '../../../components/OrderDetailsItemCard';

type OrderShowPageProps = {
  locale: AppLocale;
  isAuthenticated: boolean;
  orderId: number;
};

function toSafeNumber(value: string): number {
  const normalized = value.replace(/[^\d.-]/g, '');
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPrice(locale: AppLocale, value: number): string {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(value);
}

export default async function OrderShowPage({ locale, isAuthenticated, orderId }: OrderShowPageProps) {
  const t = getCatalogTranslations(locale);
  const direction = getCatalogDirection(locale);

  if (!isAuthenticated) {
    return (
      <main dir={direction} className="mx-auto w-full max-w-[980px] px-4 py-6">
        <section className="rounded-2xl border border-secondary/30 bg-background p-6">
          <h1 className="text-xl font-semibold text-text">{t.ordersPageTitle}</h1>
          <p className="mt-3 text-sm text-text/75">{t.ordersNotAuthenticated}</p>
        </section>
      </main>
    );
  }

  if (!Number.isFinite(orderId) || orderId <= 0) {
    return <ErrorState locale={locale} />;
  }

  try {
    const details = await getOrderDetails(orderId);
    const items = details.orderItems;
    const total = items.reduce((sum, item) => {
      const subtotal = toSafeNumber(item.subtotal);
      if (subtotal > 0) {
        return sum + subtotal;
      }

      return sum + toSafeNumber(item.price) * item.quantity;
    }, 0);

    return (
      <>
        <Header locale={locale} t={t} hideSearchInput />

        <main dir={direction} className="mx-auto w-full max-w-[980px] px-4 py-6">
          <section className="rounded-2xl bg-background">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-xl font-semibold text-text">{t.orderDetailsTitle}</h1>
              <p className="text-sm text-text/70">
                {t.orderDetailsIdLabel}: <span className="font-medium text-text">#{details.order.code}</span>
              </p>
            </div>

            <div className="mt-4">
              <Link
                href="/profile/orders"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-text transition hover:bg-muted"
              >
                {t.orderDetailsBack}
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
                <p className="text-base font-semibold text-text">{t.orderDetailsEmptyTitle}</p>
                <p className="mt-1 text-sm text-text/75">{t.orderDetailsEmptyDescription}</p>
              </div>
            ) : (
              <>
                <div className="mt-5 space-y-4">
                  {items.map((item) => (
                    <OrderDetailsItemCard key={item.id ?? `${item.productId}-${item.variationId}`} locale={locale} item={item} t={t} />
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between gap-2 text-base font-semibold text-text">
                    <span>{t.orderDetailsTotal}</span>
                    <span>{formatPrice(locale, total)} {t.currencyToman}</span>
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
      </>
    );
  } catch {
    return <ErrorState locale={locale} />;
  }
}
