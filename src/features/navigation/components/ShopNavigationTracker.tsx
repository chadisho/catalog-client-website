"use client";

import { useEffect } from 'react';
import { useNavigationContextStore } from '../store/navigationContextStore';

type ShopNavigationTrackerProps = {
  shopSlug: string;
};

export default function ShopNavigationTracker({ shopSlug }: ShopNavigationTrackerProps) {
  const trackShopVisit = useNavigationContextStore((state) => state.trackShopVisit);

  useEffect(() => {
    trackShopVisit({ shopSlug });
  }, [shopSlug, trackShopVisit]);

  return null;
}
