import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import type { CartItemModel } from '../model/cartModel';

export type CartGroup = {
  id: string;
  title: string;
  subtitle: string;
  items: CartItemModel[];
  showViewProductFooter?: boolean;
};

export function toNumber(value?: string | null): number {
  if (!value) {
    return 0;
  }

  const normalizedValue = value.replace(/[^\d.-]/g, '');
  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function formatPrice(locale: CartLocale, value: number): string {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(value);
}

export function formatItemVariation(item: CartItemModel): string|undefined {
  if (!item.productVariations.length) {
    return undefined;
  }

  return item.productVariations
    .map((variation) => {
      const key = variation.attribute?.displayName ?? '';
      const value = variation.value ?? '';
      return `${key} / ${value}`.trim();
    })
    .join(' ، ');
}

export function resolveGroups(t: CartTranslations, list: CartItemModel[]): CartGroup[] {
  const groupedMap = new Map<string, CartItemModel[]>();

  list.forEach((item, index) => {
    const groupKey =
      item.productId !== null && item.productId !== undefined
        ? `product-${item.id}`
        : `product-unknown-${index}`;

    const current = groupedMap.get(groupKey);
    if (current) {
      current.push(item);
      return;
    }

    groupedMap.set(groupKey, [item]);
  });

  return Array.from(groupedMap.entries()).map(([id, items]) => ({
    id,
    title: items[0]?.productName ?? t.readyItemsTitle,
    subtitle: items[0]?.productCode ??'',
    items,
  }));
}

export function calculateTotals(items: CartItemModel[]) {
  const computedTotal = items.reduce((sum, item) => {
    const effectivePrice = toNumber(item.productPrice?.salePrice ?? item.price);
    return sum + effectivePrice * item.quantity;
  }, 0);

  const originalTotal = items.reduce((sum, item) => {
    const originalPrice = toNumber(item.productPrice?.price ?? item.price);
    return sum + originalPrice * item.quantity;
  }, 0);

  const discountPercent =
    originalTotal > 0
      ? Math.max(0, Math.round(((originalTotal - computedTotal) / originalTotal) * 100))
      : 0;
  const profit = Math.max(0, originalTotal - computedTotal);

  return {
    computedTotal,
    originalTotal,
    discountPercent,
    profit,
  };
}
