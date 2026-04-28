"use client";

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import { toastError, toastSuccess } from '../../../core/lib/toast';
import { createOrderFromCart } from '../api/cartApi';
import { useCartStore } from '../store/cartStore';
import CartHeaderBlock from './CartHeaderBlock';
import CheckoutConfirmDialog from './CheckoutConfirmDialog';
import CartGroupCard from './CartGroupCard';
import { CartSummaryDesktop, CartSummaryMobile } from './CartSummary';
import { calculateTotals, resolveGroups } from './cartViewUtils';

type CartViewProps = {
  locale: CartLocale;
  t: CartTranslations;
};

export default function CartView({ locale, t }: CartViewProps) {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const items = cart?.listProducts ?? [];
  const pendingByItemId = useCartStore((state) => state.pendingByItemId);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [isCheckoutPending, setIsCheckoutPending] = useState(false);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);

  const groups = useMemo(() => resolveGroups(t, items), [items, t]);
  const { computedTotal, originalTotal, discountPercent, profit } = useMemo(
    () => calculateTotals(items),
    [items]
  );


  const handleChangeQuantity = async (id: number | null, delta: number) => {
    if (id === null) {
      return;
    }

    const targetItem = items.find((item) => item.id === id);
    if (!targetItem) {
      return;
    }

    const nextQuantity = Math.max(1, targetItem.quantity + delta);
    if (nextQuantity === targetItem.quantity) {
      return;
    }

    try {
      await updateQuantity(id, nextQuantity);
      toastSuccess(t.updateItemToastSuccess);
    } catch (error) {
      const message = error instanceof Error && error.message.trim().length > 0
        ? error.message
        : t.updateItemToastError;
      toastError(message);
    }
  };

  const handleDeleteItem = async (id: number | null) => {
    if (id === null) {
      return;
    }

    try {
      await removeItem(id);
      toastSuccess(t.deleteItemToastSuccess);
    } catch (error) {
      const message = error instanceof Error && error.message.trim().length > 0
        ? error.message
        : t.deleteItemToastError;
      toastError(message);
    }
  };

  const handleCheckoutConfirm = async () => {
    const cartId = cart?.id;
    if (!cartId) {
      toastError(t.checkoutMissingCartId);
      return;
    }

    try {
      setIsCheckoutPending(true);
      const { orderCode } = await createOrderFromCart(cartId);

      if (!orderCode) {
        toastError(t.checkoutToastError);
        return;
      }

      toastSuccess(t.checkoutToastSuccess);
      setIsCheckoutDialogOpen(false);
      router.push(`/cart/success?orderCode=${encodeURIComponent(orderCode)}`);
    } catch (error) {
      const message = error instanceof Error && error.message.trim().length > 0
        ? error.message
        : t.checkoutToastError;
      toastError(message);
    } finally {
      setIsCheckoutPending(false);
    }
  };

  const handleCheckoutRequest = () => {
    const cartId = cart?.id;
    if (!cartId) {
      toastError(t.checkoutMissingCartId);
      return;
    }

    setIsCheckoutDialogOpen(true);
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[1280px] px-4 py-6">
        <section className="rounded-3xl border border-border bg-surface p-8 text-center">
          <p className="text-lg font-semibold text-text">{t.emptyTitle}</p>
          <p className="mt-2 text-sm text-text/70">{t.emptyDescription}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1280px] px-3 pb-[calc(12rem+env(safe-area-inset-bottom))] pt-4 lg:px-4 lg:pb-6">
      {/*<CartHeaderBlock t={t} />*/}

      <h2 className="text-base font-semibold text-text">{t.readyItemsTitle}</h2>

      <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-6">
        <section className="space-y-4">

          <div className="space-y-4">
            {groups.map((group) => {
              const isCollapsed = Boolean(collapsedGroups[group.id]);

              return (
                <CartGroupCard
                  key={group.id}
                  locale={locale}
                  t={t}
                  group={group}
                  isCollapsed={isCollapsed}
                  onToggleCollapse={() =>
                    setCollapsedGroups((current) => ({
                      ...current,
                      [group.id]: !current[group.id],
                    }))
                  }
                  onDeleteItem={handleDeleteItem}
                  onChangeQuantity={handleChangeQuantity}
                  isItemPending={(id) => (id === null ? false : Boolean(pendingByItemId[id]))}
                />
              );
            })}
          </div>
        </section>

        <CartSummaryDesktop
          locale={locale}
          t={t}
          computedTotal={computedTotal}
          originalTotal={originalTotal}
          discountPercent={discountPercent}
          profit={profit}
          onCheckout={handleCheckoutRequest}
          isCheckoutPending={isCheckoutPending}
        />
      </div>

      <CartSummaryMobile
        locale={locale}
        t={t}
        computedTotal={computedTotal}
        originalTotal={originalTotal}
        discountPercent={discountPercent}
        profit={profit}
        onCheckout={handleCheckoutRequest}
        isCheckoutPending={isCheckoutPending}
      />

      <CheckoutConfirmDialog
        isOpen={isCheckoutDialogOpen}
        locale={locale}
        t={t}
        isSubmitting={isCheckoutPending}
        onClose={() => {
          if (isCheckoutPending) {
            return;
          }

          setIsCheckoutDialogOpen(false);
        }}
        onConfirm={handleCheckoutConfirm}
      />
    </main>
  );
}
