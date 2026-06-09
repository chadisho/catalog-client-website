type ShopProfileHeroProps = {
  shopUsername: string;
  profileTitle: string;
  faName?: string | null;
  enName?: string | null;
  avatar?: string | null;

};

export default function ShopProfileHero({
  shopUsername,
  profileTitle,
  faName,
  enName,
  avatar,
}: ShopProfileHeroProps) {
  const faDisplayName = faName?.trim() ?? '';
  const enDisplayName = enName?.trim() ?? '';
  const avatarUrl = avatar?.trim() ?? '';
  const titleFallback = faDisplayName || enDisplayName || shopUsername;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">

      <div className="flex flex-col gap-3 px-4 pb-4 pt-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={titleFallback}
              className="h-16 w-16 shrink-0 rounded-2xl border border-border object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-xl font-bold text-text/70">
              {(faDisplayName || enDisplayName || shopUsername || '?').slice(0, 1).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            {faDisplayName ? <h1 className="truncate text-2xl font-bold text-text">{faDisplayName}</h1> : null}
            <p dir="ltr" className="truncate text-xs text-text/60">
              @{shopUsername}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
