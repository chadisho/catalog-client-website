import type { CommonLocale } from '../../../core/i18n/commonLocale';
import { formatLocalizedPrice, resolveDiscountPercent } from './productUiUtils';

type ProductPriceBlockProps = {
  locale: CommonLocale;
  label: string;
  originalLabel: string;
  currencyLabel: string;
  price?: string | null;
  salePrice?: string | null;
  showLabel?: boolean;
  discountTextPrefix?: string;
  stockBadgeText?: string;
};

export default function ProductPriceBlock({
  locale,
  label,
  originalLabel,
  currencyLabel,
  price,
  salePrice,
  showLabel = true,
  discountTextPrefix,
  stockBadgeText,
}: ProductPriceBlockProps) {
  const finalPrice = salePrice ?? price;

  if (!finalPrice) {
    return null;
  }

  const formattedFinalPrice = formatLocalizedPrice(finalPrice, locale);
  const formattedOriginalPrice = price ? formatLocalizedPrice(price, locale) : null;
  const discountPercent = resolveDiscountPercent(price, salePrice);

  return (
    <section className="space-y-2 rounded-2xl border border-border bg-secondary/5 p-4">
      {showLabel ? <p className="text-xs font-medium text-text/75">{label}</p> : null}
      <div className="flex flex-wrap items-center gap-2">
        {stockBadgeText ? (
          <span className="rounded-full bg-error-soft px-2 py-1 text-xs font-semibold text-error">
            {stockBadgeText}
          </span>
        ) : null}

        <p className="text-xl font-bold text-text">
          {formattedFinalPrice}
          <span className="ms-1 text-sm font-medium text-text/75">{currencyLabel}</span>
        </p>

        {salePrice && formattedOriginalPrice ? (
          <p className="text-sm text-text/60 line-through">
            {originalLabel} {formattedOriginalPrice}
          </p>
        ) : null}

        {discountPercent ? (
          <span className="rounded-full bg-error px-2 py-1 text-xs font-semibold text-error-content">
            {discountTextPrefix ? `${discountPercent}% ${discountTextPrefix}` : `${discountPercent}%`}
          </span>
        ) : null}
      </div>
    </section>
  );
}
