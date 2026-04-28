'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { CommonLocale, ProductTranslations } from '../../../core/i18n/commonLocale';
import { toastError, toastSuccess } from '../../../core/lib/toast';
import { getAuthSession } from '../../auth/api/authClientApi';
import LoginSheet, { type LoginSheetTranslations } from '../../auth/components/LoginSheet';
import { useCartStore } from '../../cart/store/cartStore';
import QuantitySelector from './QuantitySelector';
import VariationSelector from './VariationSelector';
import { resolveStockState } from './productUiUtils';

type ProductVariationOption = {
  id?: number | null;
  label: string;
  price?: string | null;
  salePrice?: string | null;
  inventory?: number | null;
  stockType?: string | null;
};

type ProductActionsProps = {
  locale: CommonLocale;
  t: ProductTranslations;
  loginSheetT: LoginSheetTranslations;
  productId?: number | null;
  baseInventory?: number | null;
  baseStockType?: string | null;
  variationOptions: string[];
  variationItems?: ProductVariationOption[];
  selectedVariation: string;
  onSelectedVariationChange: (value: string) => void;
};

export default function ProductActions({
  locale,
  t,
  loginSheetT,
  productId,
  baseInventory,
  baseStockType,
  variationOptions,
  variationItems = [],
  selectedVariation,
  onSelectedVariationChange,
}: ProductActionsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const isSubmitting = useCartStore((state) => state.isAddPending);

  const { data: session } = useQuery({
    queryKey: ['auth-session'],
    queryFn: getAuthSession,
  });

  const isAuthenticated = Boolean(session?.isAuthenticated);

  const selectedVariationItem = useMemo(() => {
    return variationItems.find((item) => item.label === selectedVariation);
  }, [selectedVariation, variationItems]);

  const selectedVariationId = selectedVariationItem?.id;

  const activeStock = useMemo(() => {
    if (selectedVariationItem) {
      return resolveStockState(selectedVariationItem.stockType, selectedVariationItem.inventory);
    }

    return resolveStockState(baseStockType, baseInventory);
  }, [baseInventory, baseStockType, selectedVariationItem]);

  const disableIncrease =
    activeStock.isOutOfStock ||
    (!activeStock.isUnlimited && activeStock.maxQuantity !== null && quantity >= activeStock.maxQuantity);

  const disableAddToCart = !productId || isSubmitting || activeStock.isOutOfStock;

  useEffect(() => {
    if (activeStock.maxQuantity !== null && activeStock.maxQuantity > 0 && quantity > activeStock.maxQuantity) {
      setQuantity(activeStock.maxQuantity);
    }
  }, [activeStock.maxQuantity, quantity]);

  const handleIncreaseQuantity = () => {
    if (disableIncrease) {
      if (!activeStock.isOutOfStock) {
        toastError(t.notEnoughStockToast);
      }
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    if (!productId || isSubmitting || activeStock.isOutOfStock) {
      return;
    }

    if (!activeStock.isUnlimited && activeStock.maxQuantity !== null && quantity > activeStock.maxQuantity) {
      toastError(t.notEnoughStockToast);
      return;
    }

    if (!isAuthenticated) {
      setIsLoginSheetOpen(true);
      return;
    }


    try {
      await addToCart({
        productId,
        quantity,
        variationId: selectedVariationId ?? undefined,
      });
      toastSuccess(t.addToCartToastSuccess, {
        action: {
          label: t.addToCartToastActionCart,
          onClick: () => router.push('/cart'),
        },
      });
      setIsSelectionModalOpen(false);
    } catch (error) {
      const message = error instanceof Error && error.message.trim().length > 0
        ? error.message
        : t.addToCartToastError;
      toastError(message);
    }
  };



  const panelContent = useMemo(
    () => (
      <>
        <VariationSelector
          label={t.variationLabel}
          options={variationOptions}
          selected={selectedVariation}
          onSelect={onSelectedVariationChange}
        />

        <QuantitySelector
          label={t.quantityLabel}
          value={quantity}
          increaseLabel={t.increaseQuantity}
          decreaseLabel={t.decreaseQuantity}
          disableIncrease={disableIncrease}
          onIncrease={handleIncreaseQuantity}
          onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
        />
      </>
    ),
    [
      disableIncrease,
      handleIncreaseQuantity,
      onSelectedVariationChange,
      quantity,
      selectedVariation,
      t,
      variationOptions,
    ]
  );

  return (
    <>
      <aside className="hidden rounded-2xl border border-border bg-background p-5 shadow-sm lg:block">
        <div className="space-y-5">
          {panelContent}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={disableAddToCart}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-content transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-primary-content/30 border-t-primary-content"
              />
            ) : null}
            {t.addToCart}
          </button>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSelectionModalOpen(true)}
            aria-label={t.openSelectionSheet}
            disabled={disableAddToCart}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-content disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-primary-content/30 border-t-primary-content"
              />
            ) : null}
            {t.addToCart}
          </button>
        </div>
      </div>

      {isSelectionModalOpen ? (
        <div className="fixed inset-0 z-40 flex items-end bg-overlay lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setIsSelectionModalOpen(false)}
            aria-label={t.closeSelectionSheet}
            className="absolute inset-0"
          />
          <div className="relative w-full rounded-t-3xl border border-border bg-background p-4 shadow-2xl">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-secondary/40" />
            <div className="space-y-5">
              {panelContent}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={disableAddToCart}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-content disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-primary-content/30 border-t-primary-content"
                  />
                ) : null}
                {t.confirmSelection}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <LoginSheet
        isOpen={isLoginSheetOpen}
        locale={locale}
        t={loginSheetT}
        onClose={() => setIsLoginSheetOpen(false)}
        onLoginSuccess={async () => {
          await queryClient.invalidateQueries({ queryKey: ['auth-session'] });
          setIsLoginSheetOpen(false);
        }}
      />
    </>
  );
}
