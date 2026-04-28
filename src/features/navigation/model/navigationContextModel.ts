export const NAVIGATION_CONTEXT_LIMITS = {
  products: 12,
  catalogs: 8,
  shops: 8,
} as const;

export type NavigationContextEntityType = 'product' | 'catalog' | 'shop';

export type LastVisitedContext = {
  type: NavigationContextEntityType;
  id: string;
  parentCatalogCode?: string;
  parentShopSlug?: string;
  timestamp: number;
};

export type NavigationContextQuery = {
  from?: 'catalog' | 'shop';
  fromCatalog?: string;
  fromShop?: string;
};
