'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import { useCartStore } from '../store/cartStore';

type UserCartsViewProps = {
  locale: CartLocale;
  t: CartTranslations;
  isAuthenticated: boolean;
  onLoginRequest: () => void;
};

export default function UserCartsView({ locale: _locale, t, isAuthenticated, onLoginRequest }: UserCartsViewProps) {
  const router = useRouter();
  const userCarts = useCartStore((state) => state.userCarts);
  const fetchUserCarts = useCartStore((state) => state.fetchUserCarts);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    void fetchUserCarts();
  }, [fetchUserCarts, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="mx-auto w-full max-w-[880px] px-4 py-8">
        <section className="rounded-3xl border border-border bg-surface p-8 text-center">
          <p className="text-xl font-semibold text-text">{t.authRequiredTitle}</p>
          <p className="mt-2 text-sm text-text/70">{t.authRequiredDescription}</p>
          <button
            type="button"
            onClick={onLoginRequest}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-content"
          >
            {t.authRequiredAction}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[880px] px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold text-text">{t.userCartsTitle}</h1>

      {userCarts.length === 0 ? (
        <section className="rounded-3xl border border-border bg-surface p-8 text-center">
          <ShoppingCart size={40} strokeWidth={1.5} className="mx-auto mb-3 text-text/40" aria-hidden />
          <p className="text-base font-medium text-text/70">{t.userCartsEmpty}</p>
        </section>
      ) : (
        <ul className="space-y-3">
          {userCarts.map((userCart) => (
            <li key={userCart.id ?? userCart.code}>
              <button
                type="button"
                onClick={() => {
                  if (userCart.shopId) {
                    const slugPart = userCart.shopSlug ? `&shopSlug=${encodeURIComponent(userCart.shopSlug)}` : '';
                    router.push(`/cart?shopId=${userCart.shopId}${slugPart}`);
                  }
                }}
                disabled={!userCart.shopId}
                className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 text-start transition hover:bg-muted disabled:cursor-default"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={20} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-text">{userCart.shopName ?? userCart.shopSlug ?? '-'}</p>
                    <p className="mt-0.5 text-xs text-text/60">
                      {t.userCartsItemCount.replace('{count}', String(userCart.itemCount))}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">{t.userCartsOpen}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
