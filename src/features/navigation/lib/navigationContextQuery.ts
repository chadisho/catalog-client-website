import type { NavigationContextQuery } from '../model/navigationContextModel';

export const NAVIGATION_QUERY_KEYS = {
  from: 'from',
  fromCatalog: 'fromCatalog',
  fromShop: 'fromShop',
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
  const fromShop = normalize(context.fromShop);

  if (fromCatalog) {
    url.searchParams.set(NAVIGATION_QUERY_KEYS.fromCatalog, fromCatalog);
  }

  if (fromShop) {
    url.searchParams.set(NAVIGATION_QUERY_KEYS.fromShop, fromShop);
  }

  return `${url.pathname}${url.search}${url.hash}`;
}
