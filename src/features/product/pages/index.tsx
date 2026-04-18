import ProductGallery from '../components/ProductGallery';
import ProductPurchasePanel from '../components/ProductPurchasePanel';
import ProductSpecs from '../components/ProductSpecs';
import Header from '../../../core/components/Header';
import {
  resolveDisplayCurrency,
  resolveMediaItems,
  resolveStockWarning,
  resolveVariationOptions,
} from '../components/productUiUtils';
import type { ProductDetailsModel } from '../model/productDetailsModel';
import ErrorState from '../../../core/components/feedback/ErrorState';
import LoadingState from '../../../core/components/feedback/LoadingState';
import type { AppLocale } from '../../../core/i18n/globalLocale';
import { getCatalogTranslations } from '../../../core/i18n/catalogLocale';
import { getProductTranslations, resolveCommonLocale } from '../../../core/i18n/commonLocale';

interface ProductPageProps {
  productCode: string;
  data?: ProductDetailsModel;
  error?: string;
  localeOverride?: AppLocale;
  shouldShowPrice?: boolean;
}

export default function ProductPage({
  productCode,
  data,
  error,
  localeOverride,
  shouldShowPrice = true,
}: ProductPageProps) {
  const locale = localeOverride ?? resolveCommonLocale(data?.productModel?.language);
  const t = getProductTranslations(locale);
  const headerT = getCatalogTranslations(locale);

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
  const variationItems = (data.variations ?? [])
    .map((variation) => ({
      id: variation.id,
      label: variation.attrsValues.join(' / '),
      price: variation.price,
      salePrice: variation.salePrice,
    }))
    .filter((item) => item.label.trim().length > 0);
  const hasStockWarning = resolveStockWarning(data);
  const specs = [
    ...(data.variationAttributes ?? []).map((attribute) => ({
      key: attribute.displayName ?? '-',
      value: attribute.values
        .map((value) => value.value)
        .filter((value): value is string => Boolean(value && value.trim().length > 0))
        .join('، '),
    })),
  ].filter((item) => item.key.trim().length > 0 && item.value.trim().length > 0);

  const productTitle = data.productModel.title ?? t.detailsTitle;
  const currencyLabel = resolveDisplayCurrency(data.productModel.currency, t);

  return (
    <>
          <Header locale={locale} t={headerT} hideSearchInput
          headerTitle={data.shopInformation?.faName ?? undefined}
              headerImage={data.shopInformation?.avatar ?? undefined}
              shopSlug={data.shopInformation?.enName ?? undefined} />

      <main className="mx-auto w-full max-w-[1126px] space-y-4 px-4 pb-24 pt-4 lg:space-y-6 lg:px-6 lg:py-6">
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="lg:col-span-8 lg:sticky lg:top-4 lg:self-start">
            <ProductGallery mediaItems={mediaItems} />
          </div>
          <div className="space-y-4 lg:col-span-4">
            <ProductPurchasePanel
              locale={locale}
              t={t}
              title={productTitle}
              productCode={productCode}
              shouldShowPrice={shouldShowPrice}
              description={data.productModel.description}
              hasStockWarning={hasStockWarning}
              basePrice={data.productModel.price}
              baseSalePrice={data.productModel.salePrice}
              currencyLabel={currencyLabel}
              productId={data.productModel.id}
              variationOptions={variationOptions}
              variationItems={variationItems}
            />
            <ProductSpecs
              title={t.technicalSpecsTitle}
              showText={t.showSpecs}
              hideText={t.hideSpecs}
              specs={specs}
            />
          </div>
        </section>
      </main>
    </>
  );
}