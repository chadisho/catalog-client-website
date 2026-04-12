'use client';

import { useMemo, useState } from 'react';
import type { CommonLocale, ProductTranslations } from '../../../core/i18n/commonLocale';
import { useCartStore } from '../../cart/store/cartStore';
import ProductPriceBlock from './ProductPriceBlock';
import QuantitySelector from './QuantitySelector';
import VariationSelector from './VariationSelector';

type ProductVariationOption = {
  id: number;
  label: string;
};

type ProductActionsProps = {
  locale: CommonLocale;
  t: ProductTranslations;
  productId?: number | null;
  variationOptions: string[];
  variationItems?: ProductVariationOption[];
  price?: string | null;
  salePrice?: string | null;
  currencyLabel: string;
};

export default function ProductActions({
  locale,
  t,
  productId,
  variationOptions,
  variationItems = [],
  price,
  salePrice,
  currencyLabel,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(variationOptions[0] ?? '');
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const isSubmitting = useCartStore((state) => state.isAddPending);
  const cartErrorType = useCartStore((state) => state.errorType);

  const hasPrice = Boolean(price || salePrice);

  const selectedVariationId = useMemo(() => {
    const matched = variationItems.find((item) => item.label === selectedVariation);
    return matched?.id;
  }, [selectedVariation, variationItems]);

  const handleAddToCart = async () => {
    if (!productId || isSubmitting) {
      return;
    }

    setShowSuccessMessage(false);

    try {
      await addToCart({
        productId,
        quantity,
        variationId: selectedVariationId,
      });

      setShowSuccessMessage(true);
      setIsSelectionModalOpen(false);
    } catch {}
  };

  const statusMessage = showSuccessMessage
    ? t.addToCartSuccess
    : cartErrorType === 'ADD'
      ? t.addToCartError
      : null;

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

        {hasPrice ? (
          <ProductPriceBlock
            locale={locale}
            label={t.priceLabel}
            originalLabel={t.originalPriceLabel}
            currencyLabel={currencyLabel}
            price={price}
            salePrice={salePrice}
            discountTextPrefix={t.discountLabel}
          />
        ) : null}
      </>
    ),
    [currencyLabel, hasPrice, locale, price, quantity, salePrice, selectedVariation, t, variationOptions]
  );

  return (
    <>
      <aside className="hidden rounded-2xl border border-border bg-background p-5 shadow-sm lg:block">
        <div className="space-y-5">
          {panelContent}
          {statusMessage ? <p className="text-sm text-text/80">{statusMessage}</p> : null}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!productId || isSubmitting}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-content transition-opacity hover:opacity-90"
          >
            {t.addToCart}
          </button>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
          {hasPrice ? (
            <div className="flex-1">
              <ProductPriceBlock
                locale={locale}
                label={t.priceLabel}
                originalLabel={t.originalPriceLabel}
                currencyLabel={currencyLabel}
                price={price}
                salePrice={salePrice}
                showLabel={false}
                discountTextPrefix={t.discountLabel}
              />
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setIsSelectionModalOpen(true)}
            aria-label={t.openSelectionSheet}
            className="h-12 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-content"
          >
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
              {statusMessage ? <p className="text-sm text-text/80">{statusMessage}</p> : null}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!productId || isSubmitting}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-content"
              >
                {t.confirmSelection}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
