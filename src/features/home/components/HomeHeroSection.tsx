import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeHeroSectionProps {
  t: HomeTranslations;
}

export default function HomeHeroSection({ t }: HomeHeroSectionProps) {
  const mockupProducts = [
    { title: t.features.item1Title, price: '89.00' },
    { title: t.features.item2Title, price: '45.00' },
    { title: t.features.item3Title, price: '129.00' },
    { title: t.features.item4Title, price: '35.00' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-background">
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
              <div className="flex items-center justify-between bg-gradient-to-r from-primary to-secondary px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                </div>
                <span className="text-xs font-medium text-primary-content/80">chadisho.app/catalog</span>
                <span className="w-4" />
              </div>

              <div className="p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <span className="text-base">🏪</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">{t.brand.combined}</p>
                    <p className="text-xs text-text/60">{t.features.badge}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {mockupProducts.map((product) => (
                    <article
                      key={product.title}
                      className="overflow-hidden rounded-xl border border-border bg-background transition hover:-translate-y-0.5"
                    >
                      <div className="h-24 w-full bg-gradient-to-br from-primary/25 via-secondary/15 to-warning/20" />
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

            <div className="absolute -left-5 -top-4 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl">
              <p className="text-xs font-bold text-text">{t.howItWorks.step1Title}</p>
              <p className="text-[10px] text-text/60">{t.features.item1Description}</p>
            </div>

            <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl">
              <p className="text-xs font-bold text-text">{t.howItWorks.step3Title}</p>
              <p className="text-[10px] text-text/60">{t.features.item2Description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
