'use client';

import { useState } from 'react';
import type { CommonLocale, ProductTranslations } from '../../../core/i18n/commonLocale';
import ProductPriceBlock from './ProductPriceBlock';

type ProductInfoProps = {
  locale: CommonLocale;
  t: ProductTranslations;
  title: string;
  productCode: string;
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
  description,
  hasStockWarning,
  price,
  salePrice,
  currencyLabel,
}: ProductInfoProps) {
  const [expanded, setExpanded] = useState(false);

  const trimmedDescription = description?.trim();
  const hasDescription = Boolean(trimmedDescription);
  const hasLongDescription = Boolean(trimmedDescription && trimmedDescription.length > 180);
  const descriptionText =
    hasDescription && !expanded && hasLongDescription
      ? `${trimmedDescription?.slice(0, 180)}...`
      : trimmedDescription;

  return (
    <section className="rounded-2xl border border-secondary/25 bg-background p-5 shadow-sm">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold leading-8 text-text lg:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-text/70">
            {t.codeLabel}: {productCode}
          </p>
        </div>

        {hasDescription ? (
          <div className="space-y-2 rounded-xl border border-secondary/25 bg-secondary/5 p-4">
            <p className="text-sm font-medium text-text/80">{t.descriptionLabel}</p>
            <p className="text-sm leading-7 text-text/85">{descriptionText}</p>
            {hasLongDescription ? (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="text-sm font-semibold text-primary"
              >
                {expanded ? t.lessDescription : t.moreDescription}
              </button>
            ) : null}
          </div>
        ) : null}

        {price || salePrice ? (
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

        {hasStockWarning ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/90 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-900/35 dark:text-rose-300">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-rose-500" />
            <span>{t.stockWarning}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
