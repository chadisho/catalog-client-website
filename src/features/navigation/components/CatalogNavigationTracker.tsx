"use client";

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useNavigationContextStore } from '../store/navigationContextStore';
import { NAVIGATION_QUERY_KEYS } from '../lib/navigationContextQuery';

type CatalogNavigationTrackerProps = {
  catalogCode: string;
  catalogTitle?: string;
  shopSlug?: string;
};

export default function CatalogNavigationTracker({
  catalogCode,
  catalogTitle,
  shopSlug,
}: CatalogNavigationTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trackCatalogVisit = useNavigationContextStore((state) => state.trackCatalogVisit);
  const hydrateFromQueryContext = useNavigationContextStore((state) => state.hydrateFromQueryContext);

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

    // Then track the current catalog visit, storing the actual pathname for accurate breadcrumb hrefs
    trackCatalogVisit({ catalogCode, catalogTitle, shopSlug, href: pathname });
  }, [catalogCode, catalogTitle, shopSlug, pathname, searchParams, trackCatalogVisit, hydrateFromQueryContext]);

  return null;
}
