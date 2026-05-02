"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNavigationContextStore } from '../store/navigationContextStore';
import { NAVIGATION_QUERY_KEYS } from '../lib/navigationContextQuery';

type ProductNavigationTrackerProps = {
  productCode: string;
  productTitle?: string;
  shopSlug?: string;
  sourceCatalogCode?: string;
  sourceCatalogTitle?: string;
};

function normalize(value?: string | null): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export default function ProductNavigationTracker({
  productCode,
  productTitle,
  shopSlug,
  sourceCatalogCode,
  sourceCatalogTitle,
}: ProductNavigationTrackerProps) {
  const searchParams = useSearchParams();
  const hydrateFromQueryContext = useNavigationContextStore((state) => state.hydrateFromQueryContext);
  const trackProductVisit = useNavigationContextStore((state) => state.trackProductVisit);

  useEffect(() => {
    // First hydrate from query context to restore lineage
    const query = {
      from: (searchParams.get(NAVIGATION_QUERY_KEYS.from) as 'catalog' | 'shop') || undefined,
      fromCatalog: searchParams.get(NAVIGATION_QUERY_KEYS.fromCatalog) || undefined,
      fromCatalogTitle: searchParams.get(NAVIGATION_QUERY_KEYS.fromCatalogTitle) || undefined,
      fromProductTitle: searchParams.get(NAVIGATION_QUERY_KEYS.fromProductTitle) || undefined,
      fromShop: searchParams.get(NAVIGATION_QUERY_KEYS.fromShop) || undefined,
      catalogTrail: searchParams.get(NAVIGATION_QUERY_KEYS.catalogTrail) || undefined,
    };
    hydrateFromQueryContext(query);

    // Then track the current product visit
    trackProductVisit({
      productCode,
      productTitle,
      shopSlug: normalize(shopSlug) ?? query.fromShop,
      sourceCatalogCode: normalize(sourceCatalogCode) ?? query.fromCatalog,
      sourceCatalogTitle: normalize(sourceCatalogTitle) ?? query.fromCatalogTitle,
    });
  }, [hydrateFromQueryContext, productCode, productTitle, searchParams, shopSlug, sourceCatalogCode, sourceCatalogTitle, trackProductVisit]);

  return null;
}
