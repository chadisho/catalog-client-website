import type { NavigationContextQuery } from '../model/navigationContextModel';

export const NAVIGATION_QUERY_KEYS = {
  from: 'from',
  fromCatalog: 'fromCatalog',
  fromCatalogTitle: 'fromCatalogTitle',
  fromProductTitle: 'fromProductTitle',
  fromShop: 'fromShop',
  catalogTrail: 'catalogTrail',
} as const;

function normalize(value?: string | null): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function appendNavigationContextToHref(href: string, context: NavigationContextQuery): string {
  const url = new URL(href, 'http://localhost');

  if (context.from === 'catalog' || context.from === 'shop') {
    url.searchParams.set(NAVIGATION_QUERY_KEYS.from, context.from);
  }

  const fromCatalog = normalize(context.fromCatalog);
  const fromCatalogTitle = normalize(context.fromCatalogTitle);
  const fromProductTitle = normalize(context.fromProductTitle);
  const fromShop = normalize(context.fromShop);
  const catalogTrail = normalize(context.catalogTrail);

  if (fromCatalog) {
    url.searchParams.set(NAVIGATION_QUERY_KEYS.fromCatalog, fromCatalog);
  }

  if (fromCatalogTitle) {
    url.searchParams.set(NAVIGATION_QUERY_KEYS.fromCatalogTitle, fromCatalogTitle);
  }

  if (fromProductTitle) {
    url.searchParams.set(NAVIGATION_QUERY_KEYS.fromProductTitle, fromProductTitle);
  }

  if (fromShop) {
    url.searchParams.set(NAVIGATION_QUERY_KEYS.fromShop, fromShop);
  }

  if (catalogTrail) {
    url.searchParams.set(NAVIGATION_QUERY_KEYS.catalogTrail, catalogTrail);
  }

  return `${url.pathname}${url.search}${url.hash}`;
}
