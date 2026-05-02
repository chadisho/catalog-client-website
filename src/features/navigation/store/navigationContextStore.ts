import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  NAVIGATION_CONTEXT_LIMITS,
  type LastVisitedContext,
  type NavigationContextQuery,
  type NavigationCatalogRef,
  type NavigationProductRef,
  type NavigationShopRef,
  type BreadcrumbItem,
} from '../model/navigationContextModel';
import { appendNavigationContextToHref } from '../lib/navigationContextQuery';

type TrackProductVisitInput = {
  productCode: string;
  productTitle?: string;
  shopSlug?: string;
  sourceCatalogCode?: string;
  sourceCatalogTitle?: string;
};

type TrackCatalogVisitInput = {
  catalogCode: string;
  catalogTitle?: string;
  shopSlug?: string;
  href?: string;
};

type TrackShopVisitInput = {
  shopSlug: string;
  shopTitle?: string;
};

type NavigationContextStore = {
  recentProducts: NavigationProductRef[];
  recentCatalogs: NavigationCatalogRef[];
  recentShops: NavigationShopRef[];
  lastVisitedContext: LastVisitedContext | null;
  lastActiveShopSlug: string | null;
  catalogBreadcrumbTrail: NavigationCatalogRef[];
  activeProductBreadcrumbs: BreadcrumbItem[];
  trackProductVisit: (input: TrackProductVisitInput) => void;
  trackCatalogVisit: (input: TrackCatalogVisitInput) => void;
  trackShopVisit: (input: TrackShopVisitInput) => void;
  hydrateFromQueryContext: (query: NavigationContextQuery) => void;
  clearNavigationContext: () => void;
};

function normalizeIdentifier(value?: string | null): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function upsertRecentProducts(list: NavigationProductRef[], product: NavigationProductRef, maxSize: number): NavigationProductRef[] {
  const next = [product, ...list.filter((item) => item.code !== product.code)];
  return next.slice(0, maxSize);
}

function upsertRecentCatalogs(list: NavigationCatalogRef[], catalog: NavigationCatalogRef, maxSize: number): NavigationCatalogRef[] {
  const next = [catalog, ...list.filter((item) => item.code !== catalog.code)];
  return next.slice(0, maxSize);
}

function upsertRecentShops(list: NavigationShopRef[], shop: NavigationShopRef, maxSize: number): NavigationShopRef[] {
  const next = [shop, ...list.filter((item) => item.slug !== shop.slug)];
  return next.slice(0, maxSize);
}

function buildCatalogTrail(currentCatalog: NavigationCatalogRef, existingTrail: NavigationCatalogRef[]): NavigationCatalogRef[] {
  const currentIndex = existingTrail.findIndex(cat => cat.code === currentCatalog.code);
  if (currentIndex >= 0) {
    // Already in trail: update entry in place (preserves href if newly provided)
    return [...existingTrail.slice(0, currentIndex), { ...existingTrail[currentIndex], ...currentCatalog }];
  }
  return [...existingTrail, currentCatalog];
}

function catalogBaseHref(cat: NavigationCatalogRef): string {
  return cat.href ?? `/catalog/chc-${encodeURIComponent(cat.code)}/${encodeURIComponent(cat.title.toLowerCase().replace(/\s+/g, '-'))}`;
}

function catalogHrefWithAncestors(cat: NavigationCatalogRef, ancestors: NavigationCatalogRef[]): string {
  const base = catalogBaseHref(cat);
  if (ancestors.length === 0) return base;
  const parent = ancestors[ancestors.length - 1];
  const trailString = ancestors.map(a => `${a.code}:${encodeURIComponent(a.title)}`).join('>');
  return appendNavigationContextToHref(base, {
    from: 'catalog',
    fromCatalog: parent.code,
    fromCatalogTitle: parent.title,
    catalogTrail: trailString,
  });
}

function buildCatalogBreadcrumbs(trail: NavigationCatalogRef[]): BreadcrumbItem[] {
  if (trail.length <= 1) return [];
  return trail.map((cat, index) => ({
    type: 'catalog' as const,
    id: cat.code,
    title: cat.title,
    href: catalogHrefWithAncestors(cat, trail.slice(0, index)),
  }));
}

function buildProductBreadcrumbs(product: NavigationProductRef, catalogTrail: NavigationCatalogRef[]): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  catalogTrail.forEach((cat, index) => {
    breadcrumbs.push({
      type: 'catalog',
      id: cat.code,
      title: cat.title,
      href: catalogHrefWithAncestors(cat, catalogTrail.slice(0, index)),
    });
  });

  // Add product
  breadcrumbs.push({
    type: 'product',
    id: product.code,
    title: product.title,
    href: `/product/chp-${product.code}/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`,
  });

  return breadcrumbs;
}

export const useNavigationContextStore = create<NavigationContextStore>()(
  persist(
    (set) => ({
      recentProducts: [],
      recentCatalogs: [],
      recentShops: [],
      lastVisitedContext: null,
      lastActiveShopSlug: null,
      catalogBreadcrumbTrail: [],
      activeProductBreadcrumbs: [],

      trackProductVisit: ({ productCode, productTitle, shopSlug, sourceCatalogCode, sourceCatalogTitle }) => {
        const normalizedProductCode = normalizeIdentifier(productCode);
        if (!normalizedProductCode) {
          return;
        }

        const normalizedProductTitle = normalizeIdentifier(productTitle) || 'product';
        const normalizedShopSlug = normalizeIdentifier(shopSlug);
        const normalizedCatalogCode = normalizeIdentifier(sourceCatalogCode);
        const normalizedCatalogTitle = normalizeIdentifier(sourceCatalogTitle) || 'catalog';

        const productRef: NavigationProductRef = {
          code: normalizedProductCode,
          title: normalizedProductTitle,
          parentCatalogCode: normalizedCatalogCode ?? undefined,
          parentShopSlug: normalizedShopSlug ?? undefined,
        };

        set((state) => {
          const updatedCatalogs = normalizedCatalogCode && normalizedCatalogTitle
            ? upsertRecentCatalogs(state.recentCatalogs, { code: normalizedCatalogCode, title: normalizedCatalogTitle }, NAVIGATION_CONTEXT_LIMITS.catalogs)
            : state.recentCatalogs;

          const updatedShops = normalizedShopSlug
            ? upsertRecentShops(state.recentShops, { slug: normalizedShopSlug }, NAVIGATION_CONTEXT_LIMITS.shops)
            : state.recentShops;

          const catalogTrail = normalizedCatalogCode && normalizedCatalogTitle
            ? buildCatalogTrail({ code: normalizedCatalogCode, title: normalizedCatalogTitle }, state.catalogBreadcrumbTrail)
            : state.catalogBreadcrumbTrail;

          const productBreadcrumbs = buildProductBreadcrumbs(productRef, catalogTrail);

          return {
            recentProducts: upsertRecentProducts(state.recentProducts, productRef, NAVIGATION_CONTEXT_LIMITS.products),
            recentCatalogs: updatedCatalogs,
            recentShops: updatedShops,
            catalogBreadcrumbTrail: catalogTrail,
            activeProductBreadcrumbs: productBreadcrumbs,
            lastVisitedContext: {
              type: 'product',
              id: normalizedProductCode,
              title: normalizedProductTitle,
              href: `/product/${normalizedProductCode}/${encodeURIComponent(normalizedProductTitle.toLowerCase().replace(/\s+/g, '-'))}`,
              parentCatalogCode: normalizedCatalogCode ?? undefined,
              parentShopSlug: normalizedShopSlug ?? undefined,
              timestamp: Date.now(),
            },
            lastActiveShopSlug: normalizedShopSlug ?? state.lastActiveShopSlug,
          };
        });
      },

      trackCatalogVisit: ({ catalogCode, catalogTitle, shopSlug, href }) => {
        const normalizedCatalogCode = normalizeIdentifier(catalogCode);
        if (!normalizedCatalogCode) {
          return;
        }

        const normalizedCatalogTitle = normalizeIdentifier(catalogTitle) || 'catalog';
        const normalizedShopSlug = normalizeIdentifier(shopSlug);

        const normalizedHref = normalizeIdentifier(href) ?? undefined;

        const catalogRef: NavigationCatalogRef = {
          code: normalizedCatalogCode,
          title: normalizedCatalogTitle,
          href: normalizedHref,
        };

        set((state) => {
          const updatedShops = normalizedShopSlug
            ? upsertRecentShops(state.recentShops, { slug: normalizedShopSlug }, NAVIGATION_CONTEXT_LIMITS.shops)
            : state.recentShops;

          const catalogTrail = buildCatalogTrail(catalogRef, state.catalogBreadcrumbTrail);

          return {
            recentCatalogs: upsertRecentCatalogs(state.recentCatalogs, catalogRef, NAVIGATION_CONTEXT_LIMITS.catalogs),
            recentShops: updatedShops,
            catalogBreadcrumbTrail: catalogTrail,
            activeProductBreadcrumbs: buildCatalogBreadcrumbs(catalogTrail),
            lastVisitedContext: {
              type: 'catalog',
              id: normalizedCatalogCode,
              title: normalizedCatalogTitle,
              href: normalizedHref ?? `/catalog/${normalizedCatalogCode}/${encodeURIComponent(normalizedCatalogTitle.toLowerCase().replace(/\s+/g, '-'))}`,
              parentShopSlug: normalizedShopSlug ?? undefined,
              timestamp: Date.now(),
            },
            lastActiveShopSlug: normalizedShopSlug ?? state.lastActiveShopSlug,
          };
        });
      },

      trackShopVisit: ({ shopSlug, shopTitle }) => {
        const normalizedShopSlug = normalizeIdentifier(shopSlug);
        if (!normalizedShopSlug) {
          return;
        }

        const shopRef: NavigationShopRef = {
          slug: normalizedShopSlug,
          title: normalizeIdentifier(shopTitle) ?? undefined,
        };

        set((state) => ({
          recentShops: upsertRecentShops(state.recentShops, shopRef, NAVIGATION_CONTEXT_LIMITS.shops),
          catalogBreadcrumbTrail: [], // Clear catalog trail when visiting shop
          activeProductBreadcrumbs: [], // Clear product breadcrumbs
          lastVisitedContext: {
            type: 'shop',
            id: normalizedShopSlug,
            title: shopRef.title,
            href: `/shop/${normalizedShopSlug}`,
            timestamp: Date.now(),
          },
          lastActiveShopSlug: normalizedShopSlug,
        }));
      },

      hydrateFromQueryContext: (query) => {
        const normalizedFrom = query.from === 'catalog' || query.from === 'shop' ? query.from : undefined;
        const normalizedFromCatalog = normalizeIdentifier(query.fromCatalog);
        const normalizedFromCatalogTitle = normalizeIdentifier(query.fromCatalogTitle) || 'catalog';
        const normalizedFromProductTitle = normalizeIdentifier(query.fromProductTitle);
        const normalizedFromShop = normalizeIdentifier(query.fromShop);

        // Parse catalog trail from query
        let catalogTrail: NavigationCatalogRef[] = [];
        if (query.catalogTrail) {
          try {
            catalogTrail = query.catalogTrail.split('>').map(pair => {
              const colonIndex = pair.indexOf(':');
              if (colonIndex < 0) return null;
              const code = pair.slice(0, colonIndex).trim();
              const title = decodeURIComponent(pair.slice(colonIndex + 1).trim());
              return code ? { code, title: title || 'catalog' } : null;
            }).filter((ref): ref is NavigationCatalogRef => ref !== null && Boolean(ref.code));
          } catch {
            // Invalid trail, ignore
          }
        }

        set((state) => {
          const updatedCatalogs = normalizedFromCatalog && normalizedFromCatalogTitle
            ? upsertRecentCatalogs(state.recentCatalogs, { code: normalizedFromCatalog, title: normalizedFromCatalogTitle }, NAVIGATION_CONTEXT_LIMITS.catalogs)
            : state.recentCatalogs;

          const updatedShops = normalizedFromShop
            ? upsertRecentShops(state.recentShops, { slug: normalizedFromShop }, NAVIGATION_CONTEXT_LIMITS.shops)
            : state.recentShops;

          let lastVisited: LastVisitedContext | null = state.lastVisitedContext;
          if (normalizedFrom === 'catalog' && normalizedFromCatalog) {
            lastVisited = {
              type: 'catalog',
              id: normalizedFromCatalog,
              title: normalizedFromCatalogTitle,
              href: `/catalog/${normalizedFromCatalog}/${encodeURIComponent(normalizedFromCatalogTitle.toLowerCase().replace(/\s+/g, '-'))}`,
              parentShopSlug: normalizedFromShop ?? undefined,
              timestamp: Date.now(),
            };
          } else if (normalizedFrom === 'shop' && normalizedFromShop) {
            lastVisited = {
              type: 'shop',
              id: normalizedFromShop,
              href: `/shop/${normalizedFromShop}`,
              timestamp: Date.now(),
            };
          }

          return {
            recentCatalogs: updatedCatalogs,
            recentShops: updatedShops,
            catalogBreadcrumbTrail: catalogTrail,
            lastActiveShopSlug: normalizedFromShop ?? state.lastActiveShopSlug,
            lastVisitedContext: lastVisited,
          };
        });
      },

      clearNavigationContext: () => {
        set({
          recentProducts: [],
          recentCatalogs: [],
          recentShops: [],
          lastVisitedContext: null,
          lastActiveShopSlug: null,
          catalogBreadcrumbTrail: [],
          activeProductBreadcrumbs: [],
        });
      },
    }),
    {
      name: 'navigation-context-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        recentProducts: state.recentProducts,
        recentCatalogs: state.recentCatalogs,
        recentShops: state.recentShops,
        lastVisitedContext: state.lastVisitedContext,
        lastActiveShopSlug: state.lastActiveShopSlug,
        catalogBreadcrumbTrail: state.catalogBreadcrumbTrail,
        activeProductBreadcrumbs: state.activeProductBreadcrumbs,
      }),
    },
  ),
);
