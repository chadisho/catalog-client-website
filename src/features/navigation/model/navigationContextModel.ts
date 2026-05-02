export const NAVIGATION_CONTEXT_LIMITS = {
  products: 12,
  catalogs: 8,
  shops: 8,
} as const;

export type NavigationContextEntityType = 'product' | 'catalog' | 'shop';

export type NavigationCatalogRef = {
  code: string;
  title: string;
  href?: string;
};

export type NavigationProductRef = {
  code: string;
  title: string;
  parentCatalogCode?: string;
  parentShopSlug?: string;
};

export type NavigationShopRef = {
  slug: string;
  title?: string;
};

export type BreadcrumbItem = {
  type: NavigationContextEntityType;
  id: string;
  title: string;
  href: string;
};

export type LastVisitedContext = {
  type: NavigationContextEntityType;
  id: string;
  title?: string;
  href?: string;
  parentCatalogCode?: string;
  parentShopSlug?: string;
  timestamp: number;
};

export type NavigationContextQuery = {
  from?: 'catalog' | 'shop';
  fromCatalog?: string;
  fromCatalogTitle?: string;
  fromProductTitle?: string;
  fromShop?: string;
  catalogTrail?: string; // encoded as "code:title>code:title"
};
