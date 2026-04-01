import type { ProductItemModel } from '../../product/model/productItemModel';

type ProductCardProps = {
  product: ProductItemModel;
};

export default function ProductCard({ product }: ProductCardProps) {
  const title = product.title ?? 'محصول';
  const imageUrl = product.coverImage ?? undefined;
  const price = product.salePrice ?? product.price ?? '0';
  const currency = product.currency ?? 'toman';
  const isOutOfStock = (product.inventory ?? 0) <= 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-secondary/30 bg-background/90 text-right text-text shadow-sm shadow-black/10 dark:shadow-black/25">
      <div className="relative">
        {imageUrl ? <img src={imageUrl} alt={title} className="h-40 w-full object-cover" /> : null}
        {product.salePrice ? (
          <span className="absolute bottom-2 left-2 rounded bg-rose-500 px-2 py-1 text-[10px] font-medium text-white">
            دارای تخفیف
          </span>
        ) : null}
      </div>

      <div className="space-y-1 p-3">
        <h3 className="line-clamp-2 text-base font-semibold text-text">{title}</h3>
        <p className="text-xs text-text/60">{product.unit ?? 'بدون واحد'}</p>

        <div className="pt-2 text-sm text-text/90">
          <span>{price}</span>
          <span className="mr-1 text-text/60">{currency}</span>
        </div>

        {isOutOfStock ? (
          <div className="mt-2 rounded-full bg-rose-100 px-3 py-1 text-center text-xs text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
            فعلا ناموجود
          </div>
        ) : null}
      </div>
    </article>
  );
}
