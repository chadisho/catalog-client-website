import type { ProductDetailsModel } from '../api/productApi';
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

  return (
    <div>
      <h1>{t.detailsTitle}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}