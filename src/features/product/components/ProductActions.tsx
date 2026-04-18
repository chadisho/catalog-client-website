'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { ProductTranslations } from '../../../core/i18n/commonLocale';
import { toastError, toastSuccess } from '../../../core/lib/toast';
import { useCartStore } from '../../cart/store/cartStore';
import QuantitySelector from './QuantitySelector';
import VariationSelector from './VariationSelector';

type ProductVariationOption = {
  id: number;
  label: string;
};

type ProductActionsProps = {
  t: ProductTranslations;
  productId?: number | null;
  variationOptions: string[];
  variationItems?: ProductVariationOption[];
};

export default function ProductActions({
  t,
  productId,
  variationOptions,
  variationItems = [],
}: ProductActionsProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(variationOptions[0] ?? '');
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const isSubmitting = useCartStore((state) => state.isAddPending);

  const selectedVariationId = useMemo(() => {
    const matched = variationItems.find((item) => item.label === selectedVariation);
    return matched?.id;
  }, [selectedVariation, variationItems]);

  const handleAddToCart = async () => {
    if (!productId || isSubmitting) {
      return;
    }


    try {
      await addToCart({
        productId,
        quantity,
        variationId: selectedVariationId,
      });
      toastSuccess(t.addToCartToastSuccess, {
        action: {
          label: t.addToCartToastActionCart,
          onClick: () => router.push('/cart'),
        },
      });
      setIsSelectionModalOpen(false);
    } catch {
      toastError(t.addToCartToastError);
    }
  };



  const panelContent = useMemo(
    () => (
      <>
        <VariationSelector
          label={t.variationLabel}
          options={variationOptions}
          selected={selectedVariation}
          onSelect={setSelectedVariation}
        />

        <QuantitySelector
          label={t.quantityLabel}
          value={quantity}
          increaseLabel={t.increaseQuantity}
          decreaseLabel={t.decreaseQuantity}
          onIncrease={() => setQuantity((prev) => prev + 1)}
          onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
        />
      </>
    ),
    [quantity, selectedVariation, t, variationOptions]
  );

  return (
    <>
      <aside className="hidden rounded-2xl border border-border bg-background p-5 shadow-sm lg:block">
        <div className="space-y-5">
          {panelContent}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!productId || isSubmitting}
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
            disabled={!productId || isSubmitting}
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
                disabled={!productId || isSubmitting}
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
    </>
  );
}
