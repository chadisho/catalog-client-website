import { CheckCircle, MessageCircle, Sparkles } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeCtaSectionProps {
  t: HomeTranslations;
}

export default function HomeCtaSection({ t }: HomeCtaSectionProps) {
  const badges = [t.cta.badge1, t.cta.badge2, t.cta.badge3];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-16 sm:px-16 sm:py-20 text-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), color-mix(in oklch, var(--color-primary) 80%, black))',
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-20 -end-20 w-80 h-80 rounded-full blur-3xl"
              style={{ background: 'color-mix(in oklch, var(--color-primary) 130%, white)' }}
            />
            <div
              className="absolute -bottom-20 -start-20 w-60 h-60 rounded-full blur-3xl"
              style={{ background: 'color-mix(in oklch, var(--color-warning) 20%, transparent)' }}
            />
          </div>

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t.cta.title}
            </h2>
            <p className="mt-5 text-lg text-primary-content/70 max-w-2xl mx-auto">{t.cta.description}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#download"
                className="btn-shine inline-flex items-center justify-center gap-2 text-base font-semibold text-primary bg-white hover:bg-gray-50 px-8 py-4 rounded-xl transition-all shadow-xl"
              >
                <Sparkles className="w-5 h-5" />
                {t.cta.primaryCta}
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 text-base font-semibold text-white border border-white/30 hover:bg-white/10 px-8 py-4 rounded-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                {t.cta.secondaryCta}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-content/70">
              {badges.map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
