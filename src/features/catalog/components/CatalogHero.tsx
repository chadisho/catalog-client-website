interface CatalogHeroProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export default function CatalogHero({ title, description, imageUrl }: CatalogHeroProps) {
  return (
    <aside className="space-y-4 rounded-2xl border border-border bg-surface p-4">
      <div className="relative overflow-hidden rounded-2xl bg-secondary/25">
        {imageUrl ? <img src={imageUrl} alt={title} className="h-52 w-full object-cover" /> : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-overlay via-transparent to-transparent" />
        <h1 className="absolute bottom-3 right-3 text-2xl font-semibold text-neutral-content">{title}</h1>
      </div>

      <p className="text-sm leading-7 text-text/80">{description}</p>
    </aside>
  );
}
