import { ChevronDown, ChevronUp, LoaderCircle, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import type { CartItemModel } from '../model/cartModel';
import { formatItemVariation, formatPrice, toNumber, type CartGroup } from './cartViewUtils';

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

function resolveProductHref(group: CartGroup): string | null {
  const firstItem = group.items[0];

  if (!firstItem) {
    return null;
  }

  if (typeof firstItem.uri === 'string' && firstItem.uri.trim().length > 0) {
    const normalizedUri = firstItem.uri.trim();

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

  const fallbackCode =
    (typeof firstItem.productCode === 'string' && firstItem.productCode.trim().length > 0
      ? firstItem.productCode.trim()
      : null) ??
    (typeof firstItem.productId === 'number' ? firstItem.productId.toString() : null);

  if (!fallbackCode) {
    return null;
  }

  return `/product/${encodeURIComponent(fallbackCode)}/${encodeURIComponent(slugifyTitle(group.title))}`;
}

function appendShouldShowPriceQuery(href: string, shouldShowPrice: boolean): string {
  const query = new URLSearchParams({
    shouldShowPrice: shouldShowPrice ? 'true' : 'false',
  });

  return `${href}?${query.toString()}`;
}

type CartGroupCardProps = {
  locale: CartLocale;
  t: CartTranslations;
  group: CartGroup;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onDeleteItem: (id: number | null) => void;
  onChangeQuantity: (id: number | null, delta: number) => void;
  isItemPending: (id: number | null) => boolean;
};

function CartItemRow({
  item,
  locale,
  t,
  onDelete,
  onChangeQuantity,
  isPending,
}: {
  item: CartItemModel;
  locale: CartLocale;
  t: CartTranslations;
  onDelete: (id: number | null) => void;
  onChangeQuantity: (id: number | null, delta: number) => void;
  isPending: boolean;
}) {
  const rowPrice = formatPrice(locale, toNumber(item.productPrice?.salePrice ?? item.price));
  const variationLabel = formatItemVariation(item);
  const isVariationEmpty = !variationLabel?.trim();

  return (
    <div
      key={item.id ?? `${item.productId}-${item.variationId ?? 0}`}
      className="rounded-xl border-b border-border/70 pb-3 last:border-b-0 last:pb-0"
    >

      <div className="mt-2 flex items-center justify-between gap-2 px-1">
        <div className="flex items-start gap-2">
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            disabled={isPending}
            className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text/80"
            aria-label={t.deleteItem}
            title={t.deleteItem}
          >
            {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </button>

          <div className={`flex min-h-10 flex-col ${isVariationEmpty ? 'justify-center' : 'justify-start'}`}>
            <p className={`text-[10px] text-text/50 ${isVariationEmpty ? 'hidden' : ''}`}>{variationLabel}</p>
            <p className={`text-base font-semibold text-text ${isVariationEmpty ? 'text-center' : ''}`}>
              {rowPrice} <span className="text-sm font-medium">{t.currencyToman}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChangeQuantity(item.id, -1)}
            disabled={isPending}
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
            disabled={isPending}
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
  isItemPending,
}: CartGroupCardProps) {
  const groupImage = group.items[0]?.productImage;
  const productHref = resolveProductHref(group);
  const productHrefWithPriceState = productHref ? appendShouldShowPriceQuery(productHref, true) : null;

  const headerContent = (
    <>
      <div className="flex-1 text-right">
        <p className="text-xl font-medium text-text">{group.title}</p>
        <p className="mt-1 text-xs text-text/60">{group.subtitle}</p>
      </div>

      {groupImage ? (
        <img
          src={groupImage}
          alt={group.title}
          className="h-16 w-16 rounded-2xl border border-border object-cover lg:h-28 lg:w-28"
          loading="lazy"
        />
      ) : (
        <div className="h-16 w-16 overflow-hidden rounded-2xl bg-muted lg:h-28 lg:w-28">
          <div className="h-full w-full bg-gradient-to-b from-primary/60 to-transparent" />
        </div>
      )}
    </>
  );

  return (
    <article className="rounded-[28px] border border-border bg-surface p-3 shadow-sm lg:p-4">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md text-text/80"
          aria-label={isCollapsed ? t.expandGroup : t.collapseGroup}
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>

        {productHrefWithPriceState ? (
          <Link
            href={productHrefWithPriceState}
            className="flex flex-1 items-start justify-between gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {headerContent}
          </Link>
        ) : (
          <div className="flex flex-1 items-start justify-between gap-3">
            {headerContent}
          </div>
        )}
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
              isPending={isItemPending(item.id)}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}
