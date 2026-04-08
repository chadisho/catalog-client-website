type ShopProfileHeroProps = {
  shopUsername: string;
  profileTitle: string;
  faName?: string | null;
  enName?: string | null;
  avatar?: string | null;
  coverImage?: string | null;
};

export default function ShopProfileHero({
  shopUsername,
  profileTitle,
  faName,
  enName,
  avatar,
  coverImage,
}: ShopProfileHeroProps) {
  const faDisplayName = faName?.trim() ?? '';
  const enDisplayName = enName?.trim() ?? '';
  const avatarUrl = avatar?.trim() ?? '';
  const coverImageUrl = coverImage?.trim() ?? '';
  const titleFallback = faDisplayName || enDisplayName || shopUsername;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="relative h-44 w-full bg-secondary/20">
        {coverImageUrl ? (
          <img src={coverImageUrl} alt={titleFallback} className="h-full w-full object-cover" />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-overlay via-overlay/20 to-transparent" />
      </div>

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
            {enDisplayName ? (
              <p dir="ltr" className="truncate text-sm text-text/75">
                {enDisplayName}
              </p>
            ) : null}
            <p dir="ltr" className="truncate text-xs text-text/60">
              @{shopUsername}
            </p>
          </div>
        </div>

        <p className="text-sm font-medium text-text/70">{profileTitle}</p>
      </div>
    </section>
  );
}
