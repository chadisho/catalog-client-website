import Link from 'next/link';
import type { ProductItemModel } from '../../product/model/productItemModel';
import {
  getCatalogTextAlignClass,
  getCatalogTranslations,
  getLocalizedCurrencyLabel,
  type CatalogLocale,
} from '../../../core/i18n/catalogLocale';

type ProductCardProps = {
  product: ProductItemModel;
  locale: CatalogLocale;
};

type DiscountBadgeProps = {
  text: string;
};

type PriceSectionProps = {
  amount: string;
  currency: string;
  locale: CatalogLocale;
};

type StockWarningProps = {
  text: string;
};

function normalizeNumericValue(value?: string | null): number | null {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/[^\d.-]/g, '');
  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatLocalizedPrice(value: string, locale: CatalogLocale): string {
  const numericValue = normalizeNumericValue(value);
  if (numericValue === null) {
    return value;
  }

  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(numericValue);
}

function resolveDiscountPercent(originalPrice?: string | null, salePrice?: string | null): number | null {
  const original = normalizeNumericValue(originalPrice);
  const sale = normalizeNumericValue(salePrice);

  if (original === null || sale === null || original <= 0 || sale >= original) {
    return null;
  }

  return Math.round(((original - sale) / original) * 100);
}

function resolveProductCode(product: ProductItemModel): string | null {
  if (typeof product.attachment === 'string' && product.attachment.trim().length > 0) {
    return product.attachment;
  }

  if (typeof product.id === 'number') {
    return product.id.toString();
  }

  return null;
}

function slugifyTitle(value: string): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'product';
  }

  return trimmedValue
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function resolveProductHref(product: ProductItemModel): string | null {
  if (typeof product.uri === 'string' && product.uri.trim().length > 0) {
    const normalizedUri = product.uri.trim();

    try {
      const parsedUrl = new URL(normalizedUri, 'http://localhost');
      const segments = parsedUrl.pathname.split('/').filter(Boolean);

      if (segments.length >= 3 && segments[0] === 'product') {
        const [, productCode, ...titleSegments] = segments;
        const productTitle = titleSegments.join('-');

        if (productCode && productTitle) {
          return `/product/${encodeURIComponent(productCode)}/${encodeURIComponent(productTitle)}`;
        }
      }
    } catch {
      return null;
    }
  }

  const fallbackProductCode = resolveProductCode(product);
  const fallbackProductTitle = slugifyTitle(product.title ?? '');

  if (!fallbackProductCode) {
    return null;
  }

  return `/product/${encodeURIComponent(fallbackProductCode)}/${encodeURIComponent(fallbackProductTitle)}`;
}

function DiscountBadge({ text }: DiscountBadgeProps) {
  return (
    <span className="absolute left-2 top-2 rounded-md bg-error px-2 py-1 text-[11px] font-medium leading-none text-error-content shadow-sm">
      {text}
    </span>
  );
}

function PriceSection({ amount, currency, locale }: PriceSectionProps) {
  const spacingClass = locale === 'fa' ? 'mr-1' : 'ml-1';

  return (
    <div className="text-sm font-semibold text-text">
      <span>{amount}</span>
      <span className={`${spacingClass} font-medium text-text/80`}>{currency}</span>
    </div>
  );
}

function StockWarning({ text }: StockWarningProps) {
  return (
    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-error-soft px-3 py-1 text-xs font-medium text-error">
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-error" />
      <span>{text}</span>
    </div>
  );
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = getCatalogTranslations(locale);
  const textAlignClass = getCatalogTextAlignClass(locale);

  const title = product.title ?? t.defaultProductTitle;
  const imageUrl = product.coverImage ?? '';
  const productHref = resolveProductHref(product);
  const priceValue = product.salePrice ?? product.price;

  const formattedPrice =
    typeof priceValue === 'string' && priceValue.trim().length > 0 ? formatLocalizedPrice(priceValue, locale) : null;

  const discountPercent = resolveDiscountPercent(product.price, product.salePrice);
  const discountText = discountPercent
    ? locale === 'fa'
      ? `${discountPercent}% ${t.discountLabel}`
      : `${discountPercent}% ${t.discountLabel}`
    : null;

  const inventory = typeof product.inventory === 'number' ? product.inventory : null;
  const hasLowStockWarning =
    (inventory !== null && inventory > 0 && inventory <= 3) ||
    product.stockType === 'low' ||
    product.stockType === 'few' ||
    product.stockType === 'limited';

  const stockWarningText = t.lowStockWarning;

  const currency = getLocalizedCurrencyLabel(product.currency ?? 'toman', locale);

  const content = (
    <article
      className={`w-full max-w-[220px] overflow-hidden rounded-2xl border border-border bg-surface p-2 text-text shadow-sm transition-colors ${textAlignClass}`}
    >
      <div className="relative overflow-hidden rounded-xl bg-muted/20">
        {imageUrl ? <img src={imageUrl} alt={title} className="h-50 w-full rounded-xl object-cover" loading="lazy" /> : null}
        {discountText ? <DiscountBadge text={discountText} /> : null}
      </div>

      <div className="space-y-1 px-1 pb-1 pt-3">
        <h3 className="line-clamp-1 text-base font-semibold leading-6 text-text">{title}</h3>
     
        {formattedPrice ? <PriceSection amount={formattedPrice} currency={currency} locale={locale} /> : null}

        {hasLowStockWarning ? <StockWarning text={stockWarningText} /> : null}
      </div>
    </article>
  );

  if (!productHref) {
    return content;
  }

  return (
    <Link href={productHref} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
      {content}
    </Link>
  );
}
