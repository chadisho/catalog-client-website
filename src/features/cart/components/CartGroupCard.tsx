import { AlertCircle, ChevronDown, ChevronUp, Minus, Pencil, Plus, Trash2 } from 'lucide-react';
import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import type { CartItemModel } from '../model/cartModel';
import { formatItemVariation, formatPrice, toNumber, type CartGroup } from './cartViewUtils';

type CartGroupCardProps = {
  locale: CartLocale;
  t: CartTranslations;
  group: CartGroup;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onDeleteItem: (id: number | null) => void;
  onChangeQuantity: (id: number | null, delta: number) => void;
};

function CartItemRow({
  item,
  locale,
  t,
  onDelete,
  onChangeQuantity,
}: {
  item: CartItemModel;
  locale: CartLocale;
  t: CartTranslations;
  onDelete: (id: number | null) => void;
  onChangeQuantity: (id: number | null, delta: number) => void;
}) {
  const rowPrice = formatPrice(locale, toNumber(item.productPrice?.salePrice ?? item.price));

  return (
    <div
      key={item.id ?? `${item.productId}-${item.variationId ?? 0}`}
      className="rounded-xl border-b border-border/70 pb-3 last:border-b-0 last:pb-0"
    >
      <div className="grid grid-cols-[38px_1fr] items-center gap-2">
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text/80"
          aria-label={t.deleteItem}
          title={t.deleteItem}
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="flex h-9 items-center justify-between rounded-lg border border-primary/70 bg-surface px-3 text-xs text-text"
          aria-label={t.editVariation}
          title={t.editVariation}
        >
          <Pencil className="h-3.5 w-3.5 text-primary" />
          <span className="truncate">{formatItemVariation(item)}</span>
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 px-1">
        <div>
          <p className="text-[10px] text-text/50">{item.unit ?? t.productCodeLabel}</p>
          <p className="text-base font-semibold text-text">
            {rowPrice} <span className="text-sm font-medium">{t.currencyToman}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChangeQuantity(item.id, -1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text/80"
            aria-label={t.decreaseQuantity}
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="inline-flex h-9 min-w-10 items-center justify-center rounded-lg bg-muted px-3 text-sm font-medium text-text">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onChangeQuantity(item.id, 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text/80"
            aria-label={t.increaseQuantity}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartGroupCard({
  locale,
  t,
  group,
  isCollapsed,
  onToggleCollapse,
  onDeleteItem,
  onChangeQuantity,
}: CartGroupCardProps) {
  return (
    <article className="rounded-[28px] border border-border bg-surface p-3 shadow-sm lg:p-4">
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md text-text/80"
          aria-label={isCollapsed ? t.expandGroup : t.collapseGroup}
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>

        <div className="flex-1 text-right">
          <p className="text-xl font-medium text-text">{group.title}</p>
          <p className="mt-1 text-xs text-text/60">{group.subtitle}</p>
        </div>

        <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-full bg-gradient-to-b from-primary/60 to-transparent" />
        </div>
      </div>

      {!isCollapsed ? (
        <div className="mt-3 space-y-2 rounded-2xl bg-background p-2 lg:p-3">
          {group.items.map((item) => (
            <CartItemRow
              key={item.id ?? `${item.productId}-${item.variationId ?? 0}`}
              item={item}
              locale={locale}
              t={t}
              onDelete={onDeleteItem}
              onChangeQuantity={onChangeQuantity}
            />
          ))}

          {group.showAddItemButton ? (
            <div className="pt-2 text-center">
              <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                <span>{t.addItem}</span>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-3 flex items-center justify-between px-1 text-danger">
        <button type="button" className="inline-flex items-center" aria-label={t.deleteItem}>
          <Trash2 className="h-5 w-5" />
        </button>

        <div className="inline-flex items-center gap-2 text-text">
          <AlertCircle className="h-5 w-5" />
          {group.showViewProductFooter ? <span className="text-base">{t.viewProduct}</span> : null}
        </div>
      </div>
    </article>
  );
}
