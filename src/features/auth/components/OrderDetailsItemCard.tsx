import type { CatalogLocale } from '../../../core/i18n/catalogLocale';
import { getLocalizedCurrencyLabel } from '../../../core/i18n/catalogLocale';
import type { OrderDetailsItemModel } from '../model/orderDetailsModel';

type OrderDetailsItemTranslations = {
  orderDetailsQtyPrice: string;
  orderDetailsSubtotal: string;
  orderDetailsVariationFallback: string;
  orderDetailsProductFallback: string;
  orderDetailsMakingDuration: string;
};

type OrderDetailsItemCardProps = {
  locale: CatalogLocale;
  item: OrderDetailsItemModel;
  t: OrderDetailsItemTranslations;
};

function toSafeNumber(value: string): number {
  const normalized = value.replace(/[^\d.-]/g, '');
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPrice(locale: CatalogLocale, value: number): string {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(value);
}

export default function OrderDetailsItemCard({ locale, item, t }: OrderDetailsItemCardProps) {
  const currency = getLocalizedCurrencyLabel(item.currency || 'toman', locale);
  const priceValue = toSafeNumber(item.price);
  const subtotalValue = toSafeNumber(item.subtotal || item.price);
  const title = item.productName || t.orderDetailsProductFallback;

  return (
    <article className="rounded-[26px] border border-border bg-surface p-3 shadow-sm sm:p-4">
      <div className="flex items-center gap-3">
        {item.productImage ? (
          <img
            src={item.productImage}
            alt={title}
            className="h-16 w-16 shrink-0 rounded-full border border-border object-cover sm:h-20 sm:w-20"
            loading="lazy"
          />
        ) : (
          <div className="h-16 w-16 shrink-0 rounded-full border border-border bg-muted sm:h-20 sm:w-20" aria-hidden />
        )}

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-text sm:text-lg">{title}</h2>

          {item.productVariation.length > 0 ? (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {item.productVariation.map((variation, index) => (
                <li
                  key={`${variation.attributeId ?? 'attr'}-${index}`}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-text/85"
                >
                  {variation.attribute?.displayName || t.orderDetailsVariationFallback} / {variation.value || '-'}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-3 space-y-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm">
            <div className="flex items-center justify-between gap-2 text-text/80">
              <span>{t.orderDetailsQtyPrice}</span>
              <span>
                {item.quantity} × {formatPrice(locale, priceValue)} {currency}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 font-semibold text-text">
              <span>{t.orderDetailsSubtotal}</span>
              <span>
                {formatPrice(locale, subtotalValue)} {currency}
              </span>
            </div>
          </div>

          {item.makingDuration ? (
            <p className="mt-2 text-xs text-text/65">
              {t.orderDetailsMakingDuration}: {item.makingDuration}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
