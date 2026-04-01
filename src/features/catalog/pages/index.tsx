import type { CatalogDetailsModel } from '../api/catalogApi';
import CatalogSection from '../components/CatalogSection';
import CatalogHero from '../components/CatalogHero';
import CatalogHeader from '../components/CatalogHeader';
import ErrorState from '../../../core/components/feedback/ErrorState';
import LoadingState from '../../../core/components/feedback/LoadingState';
import {
  type CatalogLocale,
  getCatalogDirection,
  getCatalogTextAlignClass,
  getCatalogTranslations,
  resolveCatalogLocale,
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
  const t = getCatalogTranslations(locale);
  const direction = getCatalogDirection(locale);
  const textAlignClass = getCatalogTextAlignClass(locale);

  if (!catalogCode) {
    return <ErrorState locale={locale} />;
  }

  if (error) {
    return <ErrorState locale={locale} />;
  }

  if (!data) {
    return <LoadingState locale={locale} />;
  }

  const heroTitle = data.catalogModel?.title ?? t.defaultCatalogTitle;
  const heroDescription = data.catalogModel?.description ?? data.shopInformation?.aboutUs ?? '';
  const heroImage = data.catalogModel?.image ?? data.images?.[0]?.image;
  const sections = data.sections ?? [];

  return (
    <div dir={direction} className={`min-h-screen bg-background text-text ${textAlignClass}`}>
      <CatalogHeader locale={locale} t={t} />

      <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[1fr_320px] lg:gap-8">
        <main className="space-y-10">
          {sections.length === 0 ? (
            <div className="rounded-2xl border border-secondary/30 bg-background/70 p-6 text-center text-sm text-text/70">
              {t.noContent}
            </div>
          ) : (
            sections.map((section) => (
              <CatalogSection key={section.id} section={section} locale={locale} />
            ))
          )}
        </main>

        <CatalogHero title={heroTitle} description={heroDescription} imageUrl={heroImage} />
      </div>
    </div>
  );
}