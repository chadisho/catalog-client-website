import ProductActions from '../components/ProductActions';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductSpecs from '../components/ProductSpecs';
import {
  resolveDisplayCurrency,
  resolveMediaItems,
  resolveStockWarning,
  resolveVariationOptions,
} from '../components/productUiUtils';
import type { ProductDetailsModel } from '../model/productDetailsModel';
import ErrorState from '../../../core/components/feedback/ErrorState';
import LoadingState from '../../../core/components/feedback/LoadingState';
import { getProductTranslations, resolveCommonLocale } from '../../../core/i18n/commonLocale';

interface ProductPageProps {
  productCode: string;
  data?: ProductDetailsModel;
  error?: string;
}

export default function ProductPage({ productCode, data, error }: ProductPageProps) {
  const locale = resolveCommonLocale(data?.productModel?.language);
  const t = getProductTranslations(locale);

  if (!productCode) {
    return <ErrorState locale={locale} />;
  }

  if (error) {
    return <ErrorState locale={locale} />;
  }

  if (!data) {
    return <LoadingState locale={locale} />;
  }

  const mediaItems = resolveMediaItems(data, t);
  const variationOptions = resolveVariationOptions(data);
  const hasStockWarning = resolveStockWarning(data);
  const specs = [
    ...(data.variationAttributes ?? []).map((attribute) => ({
      key: attribute.displayName ?? '-',
      value: attribute.values
        .map((value) => value.value)
        .filter((value): value is string => Boolean(value && value.trim().length > 0))
        .join('، '),
    })),
    ...(data.variations?.[0]?.attrs ?? [])
      .filter((attr) => Boolean(attr.title && attr.value))
      .map((attr) => ({
        key: attr.title as string,
        value: attr.unit ? `${attr.value} ${attr.unit}` : (attr.value as string),
      })),
  ].filter((item) => item.key.trim().length > 0 && item.value.trim().length > 0);

  const productTitle = data.productModel.title ?? t.detailsTitle;
  const currencyLabel = resolveDisplayCurrency(data.productModel.currency, t);

  return (
    <main className="mx-auto w-full max-w-[1126px] space-y-4 px-4 pb-24 pt-4 lg:space-y-6 lg:px-6 lg:py-6">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="lg:col-span-8">
          <ProductGallery mediaItems={mediaItems} />
        </div>
        <div className="space-y-4 lg:col-span-4">
          <ProductInfo
            locale={locale}
            t={t}
            title={productTitle}
            productCode={productCode}
            description={data.productModel.description}
            hasStockWarning={hasStockWarning}
            price={data.productModel.price}
            salePrice={data.productModel.salePrice}
            currencyLabel={currencyLabel}
          />
          <ProductActions
            locale={locale}
            t={t}
            variationOptions={variationOptions}
            price={data.productModel.price}
            salePrice={data.productModel.salePrice}
            currencyLabel={currencyLabel}
          />
        </div>
      </section>

      <ProductSpecs
        title={t.technicalSpecsTitle}
        showText={t.showSpecs}
        hideText={t.hideSpecs}
        specs={specs}
      />
    </main>
  );
}