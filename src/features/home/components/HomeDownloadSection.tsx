import type { HomeTranslations } from '../../../core/i18n/commonLocale';
import type { HomeDownloadLinks } from '../../../core/config/homeDownloadLinks';

interface HomeDownloadSectionProps {
  t: HomeTranslations;
  links: HomeDownloadLinks;
}

function DownloadButton({
  label,
  href,
  isSoon,
  soonTag,
}: {
  label: string;
  href: string;
  isSoon?: boolean;
  soonTag: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-text transition hover:bg-muted"
      aria-disabled={isSoon ? true : undefined}
    >
      {label}
      {isSoon ? <span className="ms-2 text-xs text-warning">({soonTag})</span> : null}
    </a>
  );
}

export default function HomeDownloadSection({ t, links }: HomeDownloadSectionProps) {
  return (
    <section id="download" className="border-b border-border bg-surface py-16 sm:py-20">
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
            isSoon={links.android.isSoon}
            soonTag={t.download.soonTag}
          />
          <DownloadButton
            label={t.download.ios}
            href={links.ios.href}
            isSoon={links.ios.isSoon}
            soonTag={t.download.soonTag}
          />
          <DownloadButton
            label={t.download.pwa}
            href={links.pwa.href}
            isSoon={links.pwa.isSoon}
            soonTag={t.download.soonTag}
          />
        </div>

        <p className="mt-4 text-center text-xs text-text/60">{t.download.note}</p>
      </div>
    </section>
  );
}
