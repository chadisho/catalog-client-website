"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../../../core/components/Header';
import { getCatalogTranslations } from '../../../../core/i18n/catalogLocale';
import { getCartDirection, getCartTranslations, type CartLocale } from '../../../../core/i18n/cartLocale';
import { useCartStore } from '../../store/cartStore';

type CartSuccessPageProps = {
  locale: CartLocale;
};

export default function CartSuccessPage({ locale }: CartSuccessPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = getCartTranslations(locale);
  const headerT = getCatalogTranslations(locale);
  const direction = getCartDirection(locale);
  const resetCart = useCartStore((state) => state.resetCart);
  const orderCode = searchParams.get('orderCode') ?? '-';

  useEffect(() => {
    resetCart();
  }, [resetCart]);

  return (
    <div dir={direction} className="min-h-screen bg-background text-text">
      <Header locale={locale} t={headerT} hideSearchInput />

      <main className="mx-auto w-full max-w-[880px] px-4 py-8">
        <section className="rounded-3xl border border-border bg-surface p-8 text-center">
          <h1 className="text-xl font-semibold text-text">{t.orderSuccessTitle}</h1>
          <p className="mt-2 text-sm text-text/70">{t.orderSuccessDescription}</p>

          <div className="mt-5 rounded-2xl border border-border bg-background p-4">
            <p className="text-xs text-text/60">{t.orderSuccessOrderCodeLabel}</p>
            <p className="mt-2 text-lg font-semibold text-primary">{orderCode}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => router.push('/profile/orders')}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-content"
            >
              {t.orderSuccessViewOrders}
            </button>
            <button
              type="button"
              onClick={() => router.push('/cart')}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-text"
            >
              {t.orderSuccessBackToCart}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
