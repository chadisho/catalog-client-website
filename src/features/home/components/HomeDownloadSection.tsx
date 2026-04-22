import type { HomeTranslations } from '../../../core/i18n/commonLocale';
import type { HomeDownloadLinks } from '../../../core/config/homeDownloadLinks';

interface HomeDownloadSectionProps {
  t: HomeTranslations;
  links: HomeDownloadLinks;
}

function DownloadButton({
  label,
  href,
  isPlaceholder,
  placeholderTag,
}: {
  label: string;
  href: string;
  isPlaceholder?: boolean;
  placeholderTag: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-text transition hover:bg-muted"
      aria-disabled={isPlaceholder ? true : undefined}
    >
      {label}
      {isPlaceholder ? <span className="ms-2 text-xs text-warning">({placeholderTag})</span> : null}
    </a>
  );
}

export default function HomeDownloadSection({ t, links }: HomeDownloadSectionProps) {
  return (
    <section id="download" className="border-b border-border/70 bg-surface py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {t.download.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl">{t.download.title}</h2>
          <p className="mt-4 text-base leading-7 text-text/75 sm:text-lg">{t.download.description}</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <DownloadButton
            label={t.download.android}
            href={links.android.href}
            isPlaceholder={links.android.isPlaceholder}
            placeholderTag={t.download.placeholderTag}
          />
          <DownloadButton
            label={t.download.ios}
            href={links.ios.href}
            isPlaceholder={links.ios.isPlaceholder}
            placeholderTag={t.download.placeholderTag}
          />
          <DownloadButton
            label={t.download.pwa}
            href={links.pwa.href}
            isPlaceholder={links.pwa.isPlaceholder}
            placeholderTag={t.download.placeholderTag}
          />
        </div>

        <p className="mt-4 text-center text-xs text-text/60">{t.download.note}</p>
      </div>
    </section>
  );
}
