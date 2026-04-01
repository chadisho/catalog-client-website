import type { CatalogModel } from '../model/catalogModel';

type CatalogCardProps = {
  catalog: CatalogModel;
};

export default function CatalogCard({ catalog }: CatalogCardProps) {
  const imageUrl = catalog.image ?? undefined;
  const title = catalog.title;
  const href = catalog.url ?? undefined;

  const content = (
    <article className="group relative overflow-hidden rounded-2xl border border-secondary/30 bg-background/90 shadow-sm shadow-black/10 transition dark:shadow-black/25">
      {imageUrl ? <img src={imageUrl} alt={title} className="h-44 w-full object-cover" /> : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent dark:from-black/65" />
      <h3 className="absolute bottom-3 right-3 text-lg font-semibold text-white drop-shadow-sm">{title}</h3>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} className="block transition hover:opacity-95">
      {content}
    </a>
  );
}
