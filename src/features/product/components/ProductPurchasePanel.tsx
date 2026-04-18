'use client';

import { useMemo, useState } from 'react';
import type { CommonLocale, ProductTranslations } from '../../../core/i18n/commonLocale';
import ProductActions from './ProductActions';
import ProductInfo from './ProductInfo';

type ProductVariationItem = {
  id?: number | null;
  label: string;
  price?: string | null;
  salePrice?: string | null;
};

type ProductPurchasePanelProps = {
  locale: CommonLocale;
  t: ProductTranslations;
  title: string;
  productCode: string;
  shouldShowPrice?: boolean;
  description?: string | null;
  hasStockWarning: boolean;
  basePrice?: string | null;
  baseSalePrice?: string | null;
  currencyLabel: string;
  productId?: number | null;
  variationOptions: string[];
  variationItems: ProductVariationItem[];
};

export default function ProductPurchasePanel({
  locale,
  t,
  title,
  productCode,
  shouldShowPrice = true,
  description,
  hasStockWarning,
  basePrice,
  baseSalePrice,
  currencyLabel,
  productId,
  variationOptions,
  variationItems,
}: ProductPurchasePanelProps) {
  const [selectedVariation, setSelectedVariation] = useState(variationOptions[0] ?? '');

  const activeVariationLabel = useMemo(() => {
    if (variationOptions.length === 0) {
      return '';
    }

    return variationOptions.includes(selectedVariation) ? selectedVariation : (variationOptions[0] ?? '');
  }, [selectedVariation, variationOptions]);

  const selectedVariationPrice = useMemo(
    () => variationItems.find((item) => item.label === activeVariationLabel),
    [activeVariationLabel, variationItems]
  );

  const activePrice = selectedVariationPrice?.price ?? basePrice;
  const activeSalePrice = selectedVariationPrice?.salePrice ?? baseSalePrice;

  return (
    <>
      <ProductInfo
        locale={locale}
        t={t}
        title={title}
        productCode={productCode}
        shouldShowPrice={shouldShowPrice}
        description={description}
        hasStockWarning={hasStockWarning}
        price={activePrice}
        salePrice={activeSalePrice}
        currencyLabel={currencyLabel}
      />

      <ProductActions
        t={t}
        productId={productId}
        variationOptions={variationOptions}
        variationItems={variationItems}
        selectedVariation={activeVariationLabel}
        onSelectedVariationChange={setSelectedVariation}
      />
    </>
  );
}