import Image from 'next/image';
import { Link2, Store, UploadCloud } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';
import I1 from '../../../assets/10.webp';
import I2 from '../../../assets/22.webp';
import I3 from '../../../assets/3.webp';
import I4 from '../../../assets/4.webp';

interface HomeHeroSectionProps {
  t: HomeTranslations;
}

export default function HomeHeroSection({ t }: HomeHeroSectionProps) {
  const mockupProducts = [
    { title: t.hero.sampleProductTitle1, price: t.hero.sampleProductPrice1, image: I1 },
    { title: t.hero.sampleProductTitle2, price: t.hero.sampleProductPrice2, image: I2 },
    { title: t.hero.sampleProductTitle3, price: t.hero.sampleProductPrice3, image: I3 },
    { title: t.hero.sampleProductTitle4, price: t.hero.sampleProductPrice4, image: I4 },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-x-0 top-0 -z-0 h-64 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent dark:from-primary/15" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {t.hero.badge}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-text sm:text-5xl lg:text-6xl">
            {t.hero.title}
            <span className="block text-primary">{t.hero.highlight}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-text/75 sm:text-lg">{t.hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#download"
              className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-content transition hover:opacity-90"
            >
              {t.hero.primaryCta}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition hover:bg-muted"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="relative z-10 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-primary/10">
              <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                </div>
                <span className="text-xs font-medium text-primary-content/80">chadisho.com/catalog</span>
                <span className="w-4" />
              </div>

              <div className="p-5">
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Store className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">{t.brand.combined}</p>
                    <p className="text-xs text-text/60">{t.hero.mockupAlt}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {mockupProducts.map((product) => (
                    <article
                      key={product.title}
                      className="overflow-hidden rounded-xl border border-border bg-background transition hover:-translate-y-0.5"
                    >
                      <div className="relative h-24 w-full bg-muted">
                        <Image src={product.image} alt={product.title} fill className="object-cover" />
                      </div>
                      <div className="p-2.5">
                        <p className="truncate text-xs font-semibold text-text">{product.title}</p>
                        <p className="mt-0.5 text-xs font-bold text-primary">${product.price}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/10 py-2.5">
                  <span className="text-xs font-semibold text-primary">{t.hero.secondaryCta} →</span>
                </div>
              </div>
            </div>

            <div className="absolute -left-5 -top-4 flex items-center gap-1 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                <UploadCloud className="h-5 w-5 text-success" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold text-text">{t.hero.sampleHeroTitle}</p>
                <p className="text-[10px] text-text/60">{t.hero.sampleHeroDescription}</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 flex items-center gap-1 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15">
                <Link2 className="h-5 w-5 text-secondary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold text-text">{t.hero.sampleHeroSubtitle}</p>
                <p className="text-[10px] text-text/60">{t.hero.sampleHeroSubtitleDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
