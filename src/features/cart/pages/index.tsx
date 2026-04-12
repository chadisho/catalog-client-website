"use client";

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '../../../core/components/Header';
import LoadingState from '../../../core/components/feedback/LoadingState';
import ErrorState from '../../../core/components/feedback/ErrorState';
import {
  getCartDirection,
  getCartTranslations,
  type CartLocale,
} from '../../../core/i18n/cartLocale';
import { getCatalogTranslations } from '../../../core/i18n/catalogLocale';
import { getAuthSession } from '../../auth/api/authClientApi';
import LoginSheet from '../../auth/components/LoginSheet';
import CartView from '../components/CartView';
import { useCartStore } from '../store/cartStore';

type CartPageProps = {
  locale: CartLocale;
};

export default function CartPage({ locale }: CartPageProps) {
  const t = getCartTranslations(locale);
  const headerT = getCatalogTranslations(locale);
  const direction = getCartDirection(locale);
  const queryClient = useQueryClient();
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);
  const hydrateCartStore = useCartStore((state) => state.hydrate);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const cart = useCartStore((state) => state.cart);
  const cartStatus = useCartStore((state) => state.status);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const resetCart = useCartStore((state) => state.resetCart);

  useEffect(() => {
    hydrateCartStore();
  }, [hydrateCartStore]);

  const {
    data: session,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useQuery({
    queryKey: ['auth-session'],
    queryFn: getAuthSession,
    enabled: hasHydrated,
  });

  const isAuthenticated = Boolean(session?.isAuthenticated);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isAuthenticated) {
      resetCart();
      return;
    }

    void fetchCart();
  }, [fetchCart, hasHydrated, isAuthenticated, resetCart]);

  if (!hasHydrated) {
    return <LoadingState locale={locale} />;
  }

  if (isSessionLoading) {
    return <LoadingState locale={locale} />;
  }

  if (isSessionError) {
    return <ErrorState locale={locale} />;
  }

  if (isAuthenticated && !cart && cartStatus === 'syncing') {
    return <LoadingState locale={locale} />;
  }

  if (isAuthenticated && !cart && cartStatus === 'error') {
    return <ErrorState locale={locale} />;
  }

  return (
    <div dir={direction} className="min-h-screen bg-background text-text">
      <Header locale={locale} t={headerT} hideSearchInput />

      {isAuthenticated ? (
        <CartView locale={locale} t={t} />
      ) : (
        <main className="mx-auto w-full max-w-[880px] px-4 py-8">
          <section className="rounded-3xl border border-border bg-surface p-8 text-center">
            <p className="text-xl font-semibold text-text">{t.authRequiredTitle}</p>
            <p className="mt-2 text-sm text-text/70">{t.authRequiredDescription}</p>
            <button
              type="button"
              onClick={() => setIsLoginSheetOpen(true)}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-content"
            >
              {t.authRequiredAction}
            </button>
          </section>
        </main>
      )}

      <LoginSheet
        isOpen={isLoginSheetOpen}
        locale={locale}
        t={headerT}
        onClose={() => setIsLoginSheetOpen(false)}
        onLoginSuccess={async () => {
          await queryClient.invalidateQueries({ queryKey: ['auth-session'] });
          await fetchCart();
          setIsLoginSheetOpen(false);
        }}
      />
    </div>
  );
}
