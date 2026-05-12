import { Download, Smartphone } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';
import type { HomeDownloadLinks } from '../../../core/config/homeDownloadLinks';

interface HomeDownloadSectionProps {
  t: HomeTranslations;
  links: HomeDownloadLinks;
}

function DownloadButton({ label, href, isSoon, soonTag }: { label: string; href: string; isSoon?: boolean; soonTag: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/20 hover:bg-surface/30 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all"
      aria-disabled={isSoon ? true : undefined}
    >
      <Download className="w-4 h-4" />
      {label}
      {isSoon ? <span className="ms-1 text-xs text-warning">({soonTag})</span> : null}
    </a>
  );
}

export default function HomeDownloadSection({ t, links }: HomeDownloadSectionProps) {
  return (
    <section id="download" className="py-20 lg:py-32 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-12 sm:px-12 lg:px-16"
          style={{
            background: 'linear-gradient(135deg, color-mix(in oklch, var(--color-primary) 90%, black), color-mix(in oklch, var(--color-primary) 70%, black))',
          }}
        >
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-10 end-10 w-60 h-60 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 start-10 w-40 h-40 bg-warning rounded-full blur-3xl" />
          </div>
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-4">
                <Smartphone className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">{t.download.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{t.download.title}</h2>
              <p className="text-white/70 leading-relaxed mb-6">{t.download.description}</p>
              {t.download.note ? (
                <p className="text-white/50 text-xs">{t.download.note}</p>
              ) : null}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <DownloadButton label={t.download.android} href={links.android.href} isSoon={links.android.isSoon} soonTag={t.download.soonTag} />
              <DownloadButton label={t.download.ios} href={links.ios.href} isSoon={links.ios.isSoon} soonTag={t.download.soonTag} />
              <DownloadButton label={t.download.pwa} href={links.pwa.href} isSoon={links.pwa.isSoon} soonTag={t.download.soonTag} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
