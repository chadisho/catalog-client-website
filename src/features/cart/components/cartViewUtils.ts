import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import type { CartItemModel } from '../model/cartModel';

export type CartGroup = {
  id: string;
  title: string;
  subtitle: string;
  items: CartItemModel[];
  showAddItemButton?: boolean;
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

export function formatItemVariation(item: CartItemModel): string {
  if (!item.productVariations.length) {
    return '-';
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
  const firstThree = list.slice(0, 3);
  const fourth = list.slice(3, 4);
  const fifth = list.slice(4, 5);
  const sixth = list.slice(5, 6);

  return [
    {
      id: 'limited',
      title: t.limitedCount,
      subtitle: t.productCodeLabel,
      items: firstThree,
      showAddItemButton: true,
    },
    {
      id: 'all-variations',
      title: t.allVariations,
      subtitle: t.productCodeLabel,
      items: fourth,
    },
    {
      id: 'single-each-variant',
      title: t.singleByEachVariant,
      subtitle: t.productCodeLabel,
      items: fifth,
      showAddItemButton: true,
    },
    {
      id: 'single-variation',
      title: t.singleVariation,
      subtitle: t.productCodeLabel,
      items: sixth,
      showViewProductFooter: true,
    },
    {
      id: 'closed-product',
      title: t.closedProduct,
      subtitle: t.productCodeLabel,
      items: [],
    },
  ];
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
