"use client";

import { useMemo, useState } from 'react';
import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import type { CartItemModel, CartModel } from '../model/cartModel';
import CartHeaderBlock from './CartHeaderBlock';
import CartGroupCard from './CartGroupCard';
import { CartSummaryDesktop, CartSummaryMobile } from './CartSummary';
import { calculateTotals, resolveGroups } from './cartViewUtils';

type CartViewProps = {
  locale: CartLocale;
  t: CartTranslations;
  cart: CartModel;
};

export default function CartView({ locale, t, cart }: CartViewProps) {
  const [items, setItems] = useState<CartItemModel[]>(cart.listProducts);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    'closed-product': true,
  });

  const groups = useMemo(() => resolveGroups(t, items), [items, t]);
  const { computedTotal, originalTotal, discountPercent, profit } = useMemo(
    () => calculateTotals(items),
    [items]
  );

  const handleChangeQuantity = (id: number | null, delta: number) => {
    if (id === null) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, item.quantity + delta),
        };
      })
    );
  };

  const handleDeleteItem = (id: number | null) => {
    if (id === null) {
      return;
    }

    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
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
    <main className="mx-auto w-full max-w-[1280px] px-3 pb-24 pt-4 lg:px-4 lg:pb-6">
      <CartHeaderBlock t={t} />

      <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        <section className="space-y-4">
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
