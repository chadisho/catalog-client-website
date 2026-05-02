"use client";

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../../core/components/Header';
import type { CatalogLocale } from '../../../core/i18n/catalogLocale';
import CatalogHero from '../components/CatalogHero';
import CatalogSection from '../components/CatalogSection';
import type { CatalogImageModel } from '../model/catalogImageModel';
import type { AnySectionModel, CatalogSectionModel, ProductSectionModel } from '../model/sectionModel';
import CatalogNavigationTracker from '../../navigation/components/CatalogNavigationTracker';
import NavigationBreadcrumbs from '../../navigation/components/NavigationBreadcrumbs';
import { NAVIGATION_QUERY_KEYS } from '../../navigation/lib/navigationContextQuery';

type CatalogPageClientTranslations = {
  defaultCatalogTitle: string;
  noContent: string;
  searchNoResults: string;
  searchPlaceholder: string;
  login: string;
  cart: string;
  language: string;
  languageFa: string;
  languageEn: string;
  theme: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
  brand: string;
  profile: string;
  profileOrders: string;
  logout: string;
  openMenu: string;
  closeMenu: string;
  loginSheetTitle: string;
  loginSheetDescription: string;
  mobileLabel: string;
  mobilePlaceholder: string;
  sendOtp: string;
  otpLabel: string;
  otpPlaceholder: string;
  verifyOtp: string;
  resendOtp: string;
  backToMobile: string;
  close: string;
  authInvalidCellphone: string;
  authInvalidOtp: string;
  authGenericError: string;
};

interface CatalogPageClientProps {
  locale: CatalogLocale;
  t: CatalogPageClientTranslations;
  headerTitle?: string;
  headerImage?: string;
  shopSlug?: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: string;
  heroImages: CatalogImageModel[];
  sections: AnySectionModel[];
  shouldShowProductPrice: boolean;
  catalogCode: string;
}

function includesQuery(value: string | null | undefined, normalizedQuery: string): boolean {
  if (!value) {
    return false;
  }

  return value.toLocaleLowerCase().includes(normalizedQuery);
}

function filterSectionByQuery(section: AnySectionModel, normalizedQuery: string): AnySectionModel {
  if (section.sectionable_type === 'product') {
    const filteredValues = section.values.filter((item) => {
      const title = item.title ?? '';
      const description = item.description ?? '';
      return includesQuery(title, normalizedQuery) || includesQuery(description, normalizedQuery);
    });

    return {
      ...section,
      values: filteredValues,
    } as ProductSectionModel;
  }

  const filteredValues = section.values.filter((item) => {
    const title = item.title ?? '';
    const description = item.description ?? '';
    return includesQuery(title, normalizedQuery) || includesQuery(description, normalizedQuery);
  });

  return {
    ...section,
    values: filteredValues,
  } as CatalogSectionModel;
}

export default function CatalogPageClient({
  locale,
  t,
  headerTitle,
  headerImage,
  shopSlug,
  heroTitle,
  heroDescription,
  heroImage,
  heroImages,
  sections,
  shouldShowProductPrice,
  catalogCode,
}: CatalogPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();

  const outgoingCatalogTrail = useMemo(() => {
    const existingTrail = searchParams.get(NAVIGATION_QUERY_KEYS.catalogTrail) ?? '';
    const currentEntry = `${catalogCode}:${encodeURIComponent(heroTitle)}`;
    return existingTrail ? `${existingTrail}>${currentEntry}` : currentEntry;
  }, [searchParams, catalogCode, heroTitle]);

  const normalizedQuery = searchTerm.trim().toLocaleLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) {
      return sections;
    }

    return sections
      .map((section) => filterSectionByQuery(section, normalizedQuery))
      .filter((section) => section.values.length > 0);
  }, [normalizedQuery, sections]);

  const isSearching = normalizedQuery.length > 0;
  const noSectionsInCatalog = sections.length === 0;
  const noSearchResults = isSearching && filteredSections.length === 0;

  return (
    <>
      <CatalogNavigationTracker catalogCode={catalogCode} catalogTitle={heroTitle} shopSlug={shopSlug} />
      <Header
        locale={locale}
        t={t}
        headerTitle={headerTitle}
        headerImage={headerImage}
        shopSlug={shopSlug}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <NavigationBreadcrumbs className="mx-auto mt-4 w-full max-w-[1400px] px-4" />

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_320px] lg:gap-8">
        <div className="order-1 min-w-0 lg:order-2 lg:sticky lg:top-4 lg:h-fit lg:self-start">
          <CatalogHero
            title={heroTitle}
            description={heroDescription}
            images={heroImages}
            fallbackImageUrl={heroImage}
            autoPlayIntervalMs={8000}
          />
        </div>

        <main className="order-2 min-w-0 space-y-10 lg:order-1">
          {noSectionsInCatalog ? (
            <div className="rounded-2xl border border-secondary/30 bg-background/70 p-6 text-center text-sm text-text/70">
              {t.noContent}
            </div>
          ) : noSearchResults ? (
            <div className="rounded-2xl border border-secondary/30 bg-background/70 p-6 text-center text-sm text-text/70">
              {t.searchNoResults}
            </div>
          ) : (
            filteredSections.map((section) => (
              <CatalogSection
                key={section.id}
                section={section}
                locale={locale}
                shouldShowProductPrice={shouldShowProductPrice}
                contextCatalogCode={catalogCode}
                contextCatalogTitle={heroTitle}
                contextShopSlug={shopSlug}
                catalogTrail={outgoingCatalogTrail}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
}
