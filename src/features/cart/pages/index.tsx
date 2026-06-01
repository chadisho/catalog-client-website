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
import UserCartsView from '../components/UserCartsView';
import { useCartStore } from '../store/cartStore';
import BackToLastContextButton from '../../navigation/components/BackToLastContextButton';

type CartPageProps = {
  locale: CartLocale;
  shopSlug?: string;
  shopId?: number;
};

export default function CartPage({ locale, shopSlug, shopId }: CartPageProps) {
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

    if (shopId) {
      void fetchCart(shopId);
    }
  }, [fetchCart, hasHydrated, isAuthenticated, resetCart, shopId]);

  if (!hasHydrated) {
    return <LoadingState />;
  }

  if (isSessionLoading) {
    return <LoadingState />;
  }

  if (isSessionError) {
    return <ErrorState locale={locale} />;
  }

  if (shopId && isAuthenticated && !cart && cartStatus === 'syncing') {
    return <LoadingState />;
  }

  if (shopId && isAuthenticated && !cart && cartStatus === 'error') {
    return <ErrorState locale={locale} />;
  }

  return (
    <div dir={direction} className="min-h-screen bg-background text-text">
      <Header locale={locale} t={headerT} hideSearchInput shopSlug={shopSlug} shopId={shopId} />

      <main dir={direction} className="mx-auto w-full max-w-[1280px] px-4 pt-4">
        <BackToLastContextButton label={t.backToLastContext} />
      </main>

      {!shopId ? (
        <UserCartsView locale={locale} t={t} isAuthenticated={isAuthenticated} onLoginRequest={() => setIsLoginSheetOpen(true)} />
      ) : isAuthenticated ? (
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
          if (shopId) {
            await fetchCart(shopId);
          }
          setIsLoginSheetOpen(false);
        }}
      />
    </div>
  );
}
