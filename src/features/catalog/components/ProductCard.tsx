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

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = getCatalogTranslations(locale);
  const textAlignClass = getCatalogTextAlignClass(locale);

  const title = product.title ?? t.defaultProductTitle;
  const imageUrl = product.coverImage ?? undefined;
  const price = product.salePrice ?? product.price ?? '0';
  const currency = getLocalizedCurrencyLabel(product.currency ?? 'toman', locale);
  const isOutOfStock = (product.inventory ?? 0) <= 0;
  const currencySpacingClass = locale === 'fa' ? 'mr-1' : 'ml-1';

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-secondary/30 bg-background/90 text-text shadow-sm shadow-black/10 dark:shadow-black/25 ${textAlignClass}`}
    >
      <div className="relative">
        {imageUrl ? <img src={imageUrl} alt={title} className="h-40 w-full object-cover" /> : null}
        {product.salePrice ? (
          <span className="absolute bottom-2 left-2 rounded bg-rose-500 px-2 py-1 text-[10px] font-medium text-white">
            {t.hasDiscount}
          </span>
        ) : null}
      </div>

      <div className="space-y-1 p-3">
        <h3 className="line-clamp-2 text-base font-semibold text-text">{title}</h3>
        <p className="text-xs text-text/60">{product.unit ?? t.noUnit}</p>

        <div className="pt-2 text-sm text-text/90">
          <span>{price}</span>
          <span className={`${currencySpacingClass} text-text/60`}>{currency}</span>
        </div>

        {isOutOfStock ? (
          <div className="mt-2 rounded-full bg-rose-100 px-3 py-1 text-center text-xs text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
            {t.outOfStock}
          </div>
        ) : null}
      </div>
    </article>
  );
}
