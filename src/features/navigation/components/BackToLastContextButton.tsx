"use client";

import { useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useNavigationContextStore } from '../store/navigationContextStore';

type BackToLastContextButtonProps = {
  label: string;
  className?: string;
};

function resolveTargetFromContext(
  lastVisitedContext: ReturnType<typeof useNavigationContextStore.getState>['lastVisitedContext'],
  recentProducts: string[],
  recentCatalogs: string[],
  recentShops: string[],
): string | null {
  if (lastVisitedContext?.type === 'product') {
    return `/product/chp-${encodeURIComponent(lastVisitedContext.id)}/product`;
  }

  if (lastVisitedContext?.type === 'catalog') {
    return `/catalog/chc-${encodeURIComponent(lastVisitedContext.id)}/catalog`;
  }

  if (lastVisitedContext?.type === 'shop') {
    return `/shop/${encodeURIComponent(lastVisitedContext.id)}`;
  }

  const recentProduct = recentProducts[0];
  if (recentProduct) {
    return `/product/chp-${encodeURIComponent(recentProduct)}/product`;
  }

  const recentCatalog = recentCatalogs[0];
  if (recentCatalog) {
    return `/catalog/chc-${encodeURIComponent(recentCatalog)}/catalog`;
  }

  const recentShop = recentShops[0];
  if (recentShop) {
    return `/shop/${encodeURIComponent(recentShop)}`;
  }

  return null;
}

export default function BackToLastContextButton({ label, className }: BackToLastContextButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const lastVisitedContext = useNavigationContextStore((state) => state.lastVisitedContext);
  const recentProducts = useNavigationContextStore((state) => state.recentProducts);
  const recentCatalogs = useNavigationContextStore((state) => state.recentCatalogs);
  const recentShops = useNavigationContextStore((state) => state.recentShops);

  const target = useMemo(
    () => resolveTargetFromContext(lastVisitedContext, recentProducts, recentCatalogs, recentShops),
    [lastVisitedContext, recentCatalogs, recentProducts, recentShops],
  );

  if (!target || target === pathname) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => router.push(target)}
      className={
        className ??
        'inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-text transition hover:bg-muted'
      }
    >
      {label}
    </button>
  );
}
