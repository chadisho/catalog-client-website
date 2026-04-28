"use client";

import { useEffect } from 'react';
import { useNavigationContextStore } from '../store/navigationContextStore';

type CatalogNavigationTrackerProps = {
  catalogCode: string;
  shopSlug?: string;
};

export default function CatalogNavigationTracker({
  catalogCode,
  shopSlug,
}: CatalogNavigationTrackerProps) {
  const trackCatalogVisit = useNavigationContextStore((state) => state.trackCatalogVisit);

  useEffect(() => {
    trackCatalogVisit({ catalogCode, shopSlug });
  }, [catalogCode, shopSlug, trackCatalogVisit]);

  return null;
}
