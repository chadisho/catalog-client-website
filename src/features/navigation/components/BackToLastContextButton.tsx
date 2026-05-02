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
  recentProducts: ReturnType<typeof useNavigationContextStore.getState>['recentProducts'],
  recentCatalogs: ReturnType<typeof useNavigationContextStore.getState>['recentCatalogs'],
  recentShops: ReturnType<typeof useNavigationContextStore.getState>['recentShops'],
): string | null {
  if (lastVisitedContext?.href) {
    return lastVisitedContext.href;
  }

  if (lastVisitedContext?.type === 'product') {
    const title = lastVisitedContext.title || 'product';
    return `/product/${lastVisitedContext.id}/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`;
  }

  if (lastVisitedContext?.type === 'catalog') {
    const title = lastVisitedContext.title || 'catalog';
    return `/catalog/${lastVisitedContext.id}/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`;
  }

  if (lastVisitedContext?.type === 'shop') {
    return `/shop/${lastVisitedContext.id}`;
  }

  const recentProduct = recentProducts[0];
  if (recentProduct) {
    const title = recentProduct.title || 'product';
    return `/product/${recentProduct.code}/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`;
  }

  const recentCatalog = recentCatalogs[0];
  if (recentCatalog) {
    const title = recentCatalog.title || 'catalog';
    return `/catalog/${recentCatalog.code}/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`;
  }

  const recentShop = recentShops[0];
  if (recentShop) {
    return `/shop/${recentShop.slug}`;
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
