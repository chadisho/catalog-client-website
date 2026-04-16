'use client';

import { useState } from 'react';
import type { CommonLocale, ProductTranslations } from '../../../core/i18n/commonLocale';
import ProductPriceBlock from './ProductPriceBlock';
import ProductDescription from './ProductDescription';

type ProductInfoProps = {
  locale: CommonLocale;
  t: ProductTranslations;
  title: string;
  productCode: string;
  shouldShowPrice?: boolean;
  description?: string | null;
  hasStockWarning: boolean;
  price?: string | null;
  salePrice?: string | null;
  currencyLabel: string;
};

export default function ProductInfo({
  locale,
  t,
  title,
  productCode,
  shouldShowPrice = true,
  description,
  hasStockWarning,
  price,
  salePrice,
  currencyLabel,
}: ProductInfoProps) {
  const [expanded, setExpanded] = useState(false);

  const trimmedDescription = description?.trim();
  const hasDescription = Boolean(trimmedDescription);

  return (
    <section className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold leading-8 text-text lg:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-text/70">
            {t.codeLabel}: {productCode}
          </p>
        </div>
        
              
        {shouldShowPrice && (price || salePrice) ? (
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

        {hasDescription ? (
          <div className="space-y-2 rounded-xl border border-border bg-secondary/5 p-4">
            <p className="text-sm font-medium text-text/80">{t.descriptionLabel}</p>
            <ProductDescription
              description={trimmedDescription ?? ''}
              expanded={expanded}
              onToggle={() => setExpanded((prev) => !prev)}
              moreLabel={t.moreDescription}
              lessLabel={t.lessDescription}
            />
          </div>
        ) : null}

     

        {hasStockWarning ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-error-soft px-3 py-1 text-xs font-semibold text-error">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-error" />
            <span>{t.stockWarning}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
