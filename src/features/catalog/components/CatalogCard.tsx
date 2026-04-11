import Link from 'next/link';
import type { CatalogModel } from '../model/catalogModel';

type CatalogCardProps = {
  catalog: CatalogModel;
};

function slugifyTitle(value: string): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'catalog';
  }

  return trimmedValue
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function normalizeCatalogCode(value: string): string {
  return value.trim().replace(/^chc-/i, '');
}

function resolveCatalogHref(catalog: CatalogModel): string | null {
  if (typeof catalog.uri === 'string' && catalog.uri.trim().length > 0) {
    const normalizedUrl = catalog.uri.trim();

      try {
          
      const parsedUrl = new URL(normalizedUrl, 'http://localhost');
      const segments = parsedUrl.pathname.split('/').filter(Boolean);
      const catalogSegmentIndex = segments.findIndex((segment) => segment === 'catalog');

      if (catalogSegmentIndex >= 0 && segments.length >= catalogSegmentIndex + 2) {
        const routeCatalogCode = normalizeCatalogCode(decodeURIComponent(segments[catalogSegmentIndex + 1] ?? ''));
        const routeCatalogTitle = segments
          .slice(catalogSegmentIndex + 2)
          .map((segment) => decodeURIComponent(segment))
          .join('-')
          .trim();
        const safeCatalogTitle = routeCatalogTitle || slugifyTitle(catalog.title);

        if (routeCatalogCode && safeCatalogTitle) {
          return `/catalog/${encodeURIComponent(routeCatalogCode)}/${encodeURIComponent(safeCatalogTitle)}`;
        }
      }
    } catch {
      // Continue to fallback route generation below.
    }
  }

  const fallbackCatalogCode = typeof catalog.id === 'number' ? `${catalog.id}` : null;
  const fallbackCatalogTitle = slugifyTitle(catalog.title);

  if (!fallbackCatalogCode || !fallbackCatalogTitle) {
    return null;
  }

  return `/catalog/${encodeURIComponent(fallbackCatalogCode)}/${encodeURIComponent(fallbackCatalogTitle)}`;
}

export default function CatalogCard({ catalog }: CatalogCardProps) {
  const imageUrl = catalog.image ?? undefined;
  const title = catalog.title;
  const href = resolveCatalogHref(catalog) ?? undefined;
  const content = (
    <article className="group relative overflow-hidden rounded-2xl border border-secondary/30 bg-background/90 shadow-sm transition">
      {imageUrl ? <img src={imageUrl} alt={title} className="h-44 w-full object-cover" /> : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-overlay via-overlay/20 to-transparent" />
      <h3 className="absolute bottom-3 right-3 text-lg font-semibold text-neutral-content drop-shadow-sm">{title}</h3>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
      {content}
    </Link>
  );
}
