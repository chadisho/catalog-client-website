import type { CatalogDetailsModel } from '../api/catalogApi';
import CatalogPageClient from './CatalogPageClient';
import ErrorState from '../../../core/components/feedback/ErrorState';
import LoadingState from '../../../core/components/feedback/LoadingState';
import {
  type CatalogLocale,
  getCatalogDirection,
  getCatalogTextAlignClass,
  getCatalogTranslations,
  resolveCatalogLocale,
  setCatalogLocalToCookie,
} from '../../../core/i18n/catalogLocale';

interface CatalogPageProps {
  catalogCode: string;
  data?: CatalogDetailsModel;
  error?: string;
  localeOverride?: CatalogLocale;
}

export default function CatalogPage({
  catalogCode,
  data,
  error,
  localeOverride,
}: CatalogPageProps) {
 const locale = localeOverride ?? resolveCatalogLocale(data?.catalogModel?.language);
  setCatalogLocalToCookie(locale);
  const t = getCatalogTranslations(locale);
  const direction = getCatalogDirection(locale);
  const textAlignClass = getCatalogTextAlignClass(locale);

  if (!catalogCode) {
    return <ErrorState locale={locale} />;
  }

  if (error) {
    return <ErrorState locale={locale} message={error} />;
  }

  if (!data) {
    return <LoadingState locale={locale} />;
  }

  const heroTitle = data.catalogModel?.title ?? t.defaultCatalogTitle;
  const heroDescription = data.catalogModel?.description ?? data.shopInformation?.aboutUs ?? '';
  const heroImage = data.catalogModel?.image ?? data.images?.[0]?.image;
  const heroImages = data.images ?? [];
  const sections = data.sections ?? [];
  const shouldShowProductPrice =
    data.catalogModel?.showProductPriceStatus?.trim().toLowerCase() !== 'inactive';

  return (
    <div
      dir={direction}
      className={`min-h-screen overflow-x-clip bg-background text-text ${textAlignClass}`}
    >
      <CatalogPageClient
        locale={locale}
        t={t}
        headerTitle={data.shopInformation?.faName ?? undefined}
        headerImage={data.shopInformation?.avatar ?? undefined}
        shopSlug={data.shopInformation?.enName ?? undefined}
        heroTitle={heroTitle}
        heroDescription={heroDescription}
        heroImage={heroImage ?? undefined}
        heroImages={heroImages}
        sections={sections}
        shouldShowProductPrice={shouldShowProductPrice}
      />
    </div>
  );
}