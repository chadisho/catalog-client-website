"use client";

import { useMemo, useState } from 'react';
import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import { useCartStore } from '../store/cartStore';
import CartHeaderBlock from './CartHeaderBlock';
import CartGroupCard from './CartGroupCard';
import { CartSummaryDesktop, CartSummaryMobile } from './CartSummary';
import { calculateTotals, resolveGroups } from './cartViewUtils';

type CartViewProps = {
  locale: CartLocale;
  t: CartTranslations;
};

export default function CartView({ locale, t }: CartViewProps) {
  const cart = useCartStore((state) => state.cart);
  const items = cart?.listProducts ?? [];
  const pendingByItemId = useCartStore((state) => state.pendingByItemId);
  const errorType = useCartStore((state) => state.errorType);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const groups = useMemo(() => resolveGroups(t, items), [items, t]);
  const { computedTotal, originalTotal, discountPercent, profit } = useMemo(
    () => calculateTotals(items),
    [items]
  );

  const actionError =
    errorType === 'UPDATE'
      ? t.updateItemError
      : errorType === 'DELETE'
        ? t.deleteItemError
        : null;

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
    } catch {}
  };

  const handleDeleteItem = async (id: number | null) => {
    if (id === null) {
      return;
    }

    try {
      await removeItem(id);
    } catch {}
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[1280px] px-4 py-6">
        <section className="rounded-3xl border border-border bg-surface p-8 text-center">
          <p className="text-lg font-semibold text-text">{t.emptyTitle}</p>
          <p className="mt-2 text-sm text-text/70">{t.emptyDescription}</p>
          {actionError ? <p className="mt-3 text-sm text-danger">{actionError}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1280px] px-3 pb-24 pt-4 lg:px-4 lg:pb-6">
      <CartHeaderBlock t={t} />

      <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        <section className="space-y-4">
          {actionError ? (
            <div className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              {actionError}
            </div>
          ) : null}

          <div className="space-y-4">
            <h2 className="text-base font-semibold text-text">{t.readyItemsTitle}</h2>

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
        />
      </div>

      <CartSummaryMobile
        locale={locale}
        t={t}
        computedTotal={computedTotal}
        originalTotal={originalTotal}
        discountPercent={discountPercent}
        profit={profit}
      />
    </main>
  );
}
