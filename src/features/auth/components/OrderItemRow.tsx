import { getLocalizedCurrencyLabel, type CatalogLocale } from '../../../core/i18n/catalogLocale';
import type { OrderItemModel } from '../model/orderModel';
import { formatPrice, toSafeNumberFromString } from './ordersListFormatters';

type OrderItemRowProps = {
  locale: CatalogLocale;
  item: OrderItemModel;
  fallbackTitle: string;
};

function formatOrderItemPrice(locale: CatalogLocale, item: OrderItemModel): string {
  const numericPrice = toSafeNumberFromString(item.price);

  if (numericPrice === null) {
    return '-';
  }

  const currency = getLocalizedCurrencyLabel(item.currency || 'toman', locale);
  return `${formatPrice(locale, numericPrice)} ${currency}`;
}

export default function OrderItemRow({ locale, item, fallbackTitle }: OrderItemRowProps) {
  const title = item.productName || fallbackTitle;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-background px-3 py-2">
      {item.productImage ? (
        <img src={item.productImage} alt={title} className="h-12 w-12 rounded-md border border-border object-cover" />
      ) : (
        <div className="h-12 w-12 rounded-md border border-border bg-muted" aria-hidden />
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">{title}</p>
        <p className="mt-0.5 text-xs text-text/70">
          {item.quantity} × {formatOrderItemPrice(locale, item)}
        </p>
      </div>
    </div>
  );
}
