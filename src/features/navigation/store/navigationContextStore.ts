import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  NAVIGATION_CONTEXT_LIMITS,
  type LastVisitedContext,
  type NavigationContextQuery,
} from '../model/navigationContextModel';

type TrackProductVisitInput = {
  productCode: string;
  shopSlug?: string;
  sourceCatalogCode?: string;
};

type TrackCatalogVisitInput = {
  catalogCode: string;
  shopSlug?: string;
};

type TrackShopVisitInput = {
  shopSlug: string;
};

type NavigationContextStore = {
  recentProducts: string[];
  recentCatalogs: string[];
  recentShops: string[];
  lastVisitedContext: LastVisitedContext | null;
  lastActiveShopSlug: string | null;
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

function upsertRecent(list: string[], id: string, maxSize: number): string[] {
  const next = [id, ...list.filter((item) => item !== id)];
  return next.slice(0, maxSize);
}

export const useNavigationContextStore = create<NavigationContextStore>()(
  persist(
    (set) => ({
      recentProducts: [],
      recentCatalogs: [],
      recentShops: [],
      lastVisitedContext: null,
      lastActiveShopSlug: null,

      trackProductVisit: ({ productCode, shopSlug, sourceCatalogCode }) => {
        const normalizedProductCode = normalizeIdentifier(productCode);
        if (!normalizedProductCode) {
          return;
        }

        const normalizedShopSlug = normalizeIdentifier(shopSlug);
        const normalizedCatalogCode = normalizeIdentifier(sourceCatalogCode);

        set((state) => ({
          recentProducts: upsertRecent(state.recentProducts, normalizedProductCode, NAVIGATION_CONTEXT_LIMITS.products),
          recentCatalogs: normalizedCatalogCode
            ? upsertRecent(state.recentCatalogs, normalizedCatalogCode, NAVIGATION_CONTEXT_LIMITS.catalogs)
            : state.recentCatalogs,
          recentShops: normalizedShopSlug
            ? upsertRecent(state.recentShops, normalizedShopSlug, NAVIGATION_CONTEXT_LIMITS.shops)
            : state.recentShops,
          lastVisitedContext: {
            type: 'product',
            id: normalizedProductCode,
            parentCatalogCode: normalizedCatalogCode ?? undefined,
            parentShopSlug: normalizedShopSlug ?? undefined,
            timestamp: Date.now(),
          },
          lastActiveShopSlug: normalizedShopSlug ?? state.lastActiveShopSlug,
        }));
      },

      trackCatalogVisit: ({ catalogCode, shopSlug }) => {
        const normalizedCatalogCode = normalizeIdentifier(catalogCode);
        if (!normalizedCatalogCode) {
          return;
        }

        const normalizedShopSlug = normalizeIdentifier(shopSlug);

        set((state) => ({
          recentCatalogs: upsertRecent(state.recentCatalogs, normalizedCatalogCode, NAVIGATION_CONTEXT_LIMITS.catalogs),
          recentShops: normalizedShopSlug
            ? upsertRecent(state.recentShops, normalizedShopSlug, NAVIGATION_CONTEXT_LIMITS.shops)
            : state.recentShops,
          lastVisitedContext: {
            type: 'catalog',
            id: normalizedCatalogCode,
            parentShopSlug: normalizedShopSlug ?? undefined,
            timestamp: Date.now(),
          },
          lastActiveShopSlug: normalizedShopSlug ?? state.lastActiveShopSlug,
        }));
      },

      trackShopVisit: ({ shopSlug }) => {
        const normalizedShopSlug = normalizeIdentifier(shopSlug);
        if (!normalizedShopSlug) {
          return;
        }

        set((state) => ({
          recentShops: upsertRecent(state.recentShops, normalizedShopSlug, NAVIGATION_CONTEXT_LIMITS.shops),
          lastVisitedContext: {
            type: 'shop',
            id: normalizedShopSlug,
            timestamp: Date.now(),
          },
          lastActiveShopSlug: normalizedShopSlug,
        }));
      },

      hydrateFromQueryContext: (query) => {
        const normalizedFrom = query.from === 'catalog' || query.from === 'shop' ? query.from : undefined;
        const normalizedFromCatalog = normalizeIdentifier(query.fromCatalog);
        const normalizedFromShop = normalizeIdentifier(query.fromShop);

        set((state) => ({
          recentCatalogs: normalizedFromCatalog
            ? upsertRecent(state.recentCatalogs, normalizedFromCatalog, NAVIGATION_CONTEXT_LIMITS.catalogs)
            : state.recentCatalogs,
          recentShops: normalizedFromShop
            ? upsertRecent(state.recentShops, normalizedFromShop, NAVIGATION_CONTEXT_LIMITS.shops)
            : state.recentShops,
          lastActiveShopSlug: normalizedFromShop ?? state.lastActiveShopSlug,
          lastVisitedContext:
            normalizedFrom === 'catalog' && normalizedFromCatalog
              ? {
                  type: 'catalog',
                  id: normalizedFromCatalog,
                  parentShopSlug: normalizedFromShop ?? undefined,
                  timestamp: Date.now(),
                }
              : normalizedFrom === 'shop' && normalizedFromShop
                ? {
                    type: 'shop',
                    id: normalizedFromShop,
                    timestamp: Date.now(),
                  }
                : state.lastVisitedContext,
        }));
      },

      clearNavigationContext: () => {
        set({
          recentProducts: [],
          recentCatalogs: [],
          recentShops: [],
          lastVisitedContext: null,
          lastActiveShopSlug: null,
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
      }),
    },
  ),
);
