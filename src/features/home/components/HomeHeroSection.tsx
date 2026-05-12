import { BookOpen, Link2, Share2, Star, Store, UploadCloud } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeHeroSectionProps {
  t: HomeTranslations;
}

export default function HomeHeroSection({ t }: HomeHeroSectionProps) {
  const mockupProducts = [
    { title: t.hero.sampleProductTitle1, price: t.hero.sampleProductPrice1, image: '/assets/10.webp' },
    { title: t.hero.sampleProductTitle2, price: t.hero.sampleProductPrice2, image: '/assets/22.webp' },
    { title: t.hero.sampleProductTitle3, price: t.hero.sampleProductPrice3, image: '/assets/3.webp' },
    { title: t.hero.sampleProductTitle4, price: t.hero.sampleProductPrice4, image: '/assets/4.webp' },
  ];



  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32"
      style={{
        background:
          'radial-gradient(ellipse at 20% 50%, color-mix(in oklch, var(--color-primary) 15%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, color-mix(in oklch, var(--color-warning) 10%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, color-mix(in oklch, var(--color-primary) 8%, transparent) 0%, transparent 50%)',
      }}
    >
      <div
        className="absolute top-20 start-10 w-72 h-72 rounded-full blur-3xl -z-0"
        style={{ background: 'color-mix(in oklch, var(--color-primary) 20%, transparent)' }}
      />
      <div
        className="absolute bottom-10 end-10 w-96 h-96 rounded-full blur-3xl -z-0"
        style={{ background: 'color-mix(in oklch, var(--color-warning) 10%, transparent)' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-start">


            <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-text">
              {t.hero.title}
              <span className="block gradient-text">{t.hero.highlight}</span>
            </h1>

            <p className="animate-fade-in-up-delay mt-6 text-lg sm:text-xl text-text/60 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t.hero.description}
            </p>

            <div className="animate-fade-in-up-delay-2 mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#download"
                className="btn-shine inline-flex items-center justify-center gap-2 text-base font-semibold text-primary-content bg-primary hover:opacity-90 px-7 py-3.5 rounded-xl transition-all shadow-xl shadow-primary/25"
              >
                {t.hero.primaryCta}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 text-base font-semibold text-text bg-surface hover:bg-muted px-7 py-3.5 rounded-xl border border-border transition-all shadow-sm"
              >
                {t.hero.secondaryCta}
              </a>
            </div>

            {/*todo: add real trusted brands component here*/}
             {/*<SimpleTrusedBrandComponent t={t} />*/}
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div
                className="animate-float relative overflow-hidden rounded-3xl border border-border bg-surface"
                style={{ boxShadow: '0 30px 60px -15px color-mix(in oklch, var(--color-primary) 30%, transparent), 0 10px 20px -5px color-mix(in oklch, var(--color-text) 10%, transparent)' }}
              >
                <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-danger" />
                    <span className="h-3 w-3 rounded-full bg-warning" />
                    <span className="h-3 w-3 rounded-full bg-success" />
                  </div>
                  <span className="text-primary-content/80 text-xs font-medium">chadisho.com/catalog</span>
                  <span className="w-12" />
                </div>
                <div className="p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text">{t.brand.combined}</p>
                      <p className="text-xs text-text/60">{t.hero.mockupAlt}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {mockupProducts.map((product) => (
                      <article key={product.title} className="catalog-card overflow-hidden rounded-xl border border-border bg-background">
                        <div className="relative h-24 w-full overflow-hidden bg-muted">
                          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="p-2.5">
                          <p className="truncate text-xs font-semibold text-text">{product.title}</p>
                          <p className="mt-0.5 text-xs font-bold text-primary">{product.price}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/10 py-2.5">
                    <Share2 className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary">{t.hero.secondaryCta} →</span>
                  </div>
                </div>
              </div>

              <div className="animate-float-delay absolute -top-4 -start-6 flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                  <UploadCloud className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text">{t.hero.sampleHeroTitle}</p>
                  <p className="text-[10px] text-text/60">{t.hero.sampleHeroDescription}</p>
                </div>
              </div>

              <div className="animate-float-delay-2 absolute -bottom-4 -end-4 flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                  <Link2 className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text">{t.hero.sampleHeroSubtitle}</p>
                  <p className="text-[10px] text-text/60">{t.hero.sampleHeroSubtitleDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

              {/*todo: add real trusted brands component here*/}
             
{/*<TrustedBrandsComponent />*/}
      </div>
    </section>
  );
}
export function SimpleTrusedBrandComponent({ t }: HomeHeroSectionProps) { 
    return (<div className="animate-fade-in-up-delay-2 mt-10 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {['bg-primary/20', 'bg-success/20', 'bg-warning/20', 'bg-secondary/20'].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-surface ${bg} flex items-center justify-center text-xs font-bold text-text`}
                  >
                    {['A', 'B', 'C', 'D'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-sm text-text/60 mt-0.5">{t.hero.trustedByCount}</p>
              </div>
            </div>);
}

export const TrustedBrandsComponent = () => {
      const trustedBrands = [
    { icon: BookOpen, name: 'ShopMax' },
    { icon: Star, name: 'Luxora' },
    { icon: Store, name: 'TechMart' },
    { icon: Share2, name: 'Artisan' },
      ];
    return (
       <div className="mt-20">
          <p className="text-center text-sm font-medium text-text/40 mb-8 uppercase tracking-wider">TRUSTED BY BUSINESSES WORLDWIDE</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-40 grayscale">
            {trustedBrands.map(({ icon: Icon, name }) => (
              <div key={name} className="flex items-center gap-2 text-text">
                <Icon className="w-6 h-6" />
                <span className="font-bold text-lg">{name}</span>
              </div>
            ))}
          </div>
        </div>
    );
 }