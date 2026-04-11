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
import { getCart } from '../api/cartApi';
import CartView from '../components/CartView';

type CartPageProps = {
  locale: CartLocale;
};

export default function CartPage({ locale }: CartPageProps) {
  const t = getCartTranslations(locale);
  const headerT = getCatalogTranslations(locale);
  const direction = getCartDirection(locale);
  const queryClient = useQueryClient();
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const {
    data: session,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useQuery({
    queryKey: ['auth-session'],
    queryFn: getAuthSession,
    enabled: hasMounted,
  });

  const isAuthenticated = Boolean(session?.isAuthenticated);

  const {
    data: cart,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useQuery({
    queryKey: ['cart-data'],
    queryFn: getCart,
    enabled: hasMounted && isAuthenticated,
  });

  if (!hasMounted) {
    return <LoadingState locale={locale} />;
  }

  if (isSessionLoading) {
    return <LoadingState locale={locale} />;
  }

  if (isSessionError) {
    return <ErrorState locale={locale} />;
  }

  if (isAuthenticated && isCartLoading) {
    return <LoadingState locale={locale} />;
  }

  if (isAuthenticated && (isCartError || !cart)) {
    return <ErrorState locale={locale} />;
  }

  return (
    <div dir={direction} className="min-h-screen bg-background text-text">
      <Header locale={locale} t={headerT} hideSearchInput />

      {isAuthenticated && cart ? (
        <CartView locale={locale} t={t} cart={cart} />
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
          await queryClient.invalidateQueries({ queryKey: ['cart-data'] });
          setIsLoginSheetOpen(false);
        }}
      />
    </div>
  );
}
