"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNavigationContextStore } from '../store/navigationContextStore';

type ProductNavigationTrackerProps = {
  productCode: string;
  shopSlug?: string;
  sourceCatalogCode?: string;
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
  shopSlug,
  sourceCatalogCode,
}: ProductNavigationTrackerProps) {
  const searchParams = useSearchParams();
  const hydrateFromQueryContext = useNavigationContextStore((state) => state.hydrateFromQueryContext);
  const trackProductVisit = useNavigationContextStore((state) => state.trackProductVisit);

  useEffect(() => {
    const from = searchParams.get('from');
    const fromCatalog = normalize(searchParams.get('fromCatalog'));
    const fromShop = normalize(searchParams.get('fromShop'));

    hydrateFromQueryContext({
      from: from === 'catalog' || from === 'shop' ? from : undefined,
      fromCatalog,
      fromShop,
    });

    trackProductVisit({
      productCode,
      shopSlug: normalize(shopSlug) ?? fromShop,
      sourceCatalogCode: normalize(sourceCatalogCode) ?? fromCatalog,
    });
  }, [hydrateFromQueryContext, productCode, searchParams, shopSlug, sourceCatalogCode, trackProductVisit]);

  return null;
}
