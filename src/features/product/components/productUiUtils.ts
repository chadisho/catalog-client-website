import type { CommonLocale, ProductTranslations } from '../../../core/i18n/commonLocale';
import type { ProductDetailsModel } from '../api/productApi';

export type ProductMediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
};

export type StockState = {
  isOutOfStock: boolean;
  isUnlimited: boolean;
  maxQuantity: number | null;
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

export function formatLocalizedPrice(value: string, locale: CommonLocale): string {
  const numericValue = normalizeNumericValue(value);

  if (numericValue === null) {
    return value;
  }

  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(numericValue);
}

export function resolveDiscountPercent(originalPrice?: string | null, salePrice?: string | null): number | null {
  const original = normalizeNumericValue(originalPrice);
  const sale = normalizeNumericValue(salePrice);

  if (original === null || sale === null || original <= 0 || sale >= original) {
    return null;
  }

  return Math.round(((original - sale) / original) * 100);
}

export function resolveDisplayCurrency(currency: string | null | undefined, t: ProductTranslations): string {
  if (!currency || currency.toLowerCase() === 'toman') {
    return t.currencyToman;
  }

  return currency;
}

export function resolveStockState(
  stockType: string | null | undefined,
  inventory: number | null | undefined
): StockState {
  const normalizedStockType = stockType?.trim().toLowerCase();
  const normalizedInventory = typeof inventory === 'number' ? inventory : null;

  if (normalizedStockType === 'notinstock') {
    return {
      isOutOfStock: true,
      isUnlimited: false,
      maxQuantity: 0,
    };
  }

  if (normalizedStockType === 'unlimited') {
    return {
      isOutOfStock: false,
      isUnlimited: true,
      maxQuantity: null,
    };
  }

  if (normalizedStockType === 'limited') {
    const maxQuantity = normalizedInventory ?? 0;

    return {
      isOutOfStock: maxQuantity <= 0,
      isUnlimited: false,
      maxQuantity,
    };
  }

  if (normalizedInventory !== null) {
    return {
      isOutOfStock: normalizedInventory <= 0,
      isUnlimited: false,
      maxQuantity: normalizedInventory,
    };
  }

  return {
    isOutOfStock: false,
    isUnlimited: true,
    maxQuantity: null,
  };
}

export function resolveMediaItems(data: ProductDetailsModel, t: ProductTranslations): ProductMediaItem[] {
  const videos = data.productModel.videos
    .filter((video): video is string => typeof video === 'string' && video.trim().length > 0)
    .map((video, index) => ({
      id: `video-${index}`,
      type: 'video' as const,
      src: video,
      alt: `${t.mediaVideoAlt} ${index + 1}`,
    }));

  const images = data.productModel.images
    .filter((image) => typeof image?.src === 'string' && image.src.trim().length > 0)
    .map((image, index) => ({
      id: image.id ? `image-${image.id}` : `image-${index}`,
      type: 'image' as const,
      src: image.src as string,
      alt: image.name ?? `${t.mediaImageAlt} ${index + 1}`,
    }));

  if (images.length === 0 && typeof data.productModel.coverImage === 'string' && data.productModel.coverImage.trim().length > 0) {
    images.push({
      id: 'cover-image',
      type: 'image',
      src: data.productModel.coverImage,
      alt: t.mediaImageAlt,
    });
  }

  if (videos.length > 0) {
    return [...videos, ...images];
  }

  return images;
}

export function resolveStockWarning(data: ProductDetailsModel): boolean {
  const inventory = typeof data.productModel.inventory === 'number' ? data.productModel.inventory : null;
  const stockType = data.productModel.stockType ?? '';

  return (
    (inventory !== null && inventory > 0 && inventory <= 3) ||
    stockType === 'low' ||
    stockType === 'few' ||
    stockType === 'limited'
  );
}

export function resolveVariationOptions(data: ProductDetailsModel): string[] {
  const fromVariations = (data.variations ?? [])
    .map((variation) =>
      variation.attrsValues
        .join(' / ')
    )
    .filter((label) => label.trim().length > 0);

  if (fromVariations.length > 0) {
    return Array.from(new Set(fromVariations));
  }

  const fromAttributes = (data.variationAttributes ?? [])
    .flatMap((attribute) => attribute.values)
    .map((item) => item.value)
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);

  return Array.from(new Set(fromAttributes));
}
