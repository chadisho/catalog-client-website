import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeFeaturesSectionProps {
  t: HomeTranslations;
}

export default function HomeFeaturesSection({ t }: HomeFeaturesSectionProps) {
  const items = [
    { title: t.features.item1Title, description: t.features.item1Description },
    { title: t.features.item2Title, description: t.features.item2Description },
    { title: t.features.item3Title, description: t.features.item3Description },
    { title: t.features.item4Title, description: t.features.item4Description },
  ];

  return (
    <section id="features" className="border-b border-border bg-surface py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {t.features.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl">{t.features.title}</h2>
          <p className="mt-4 text-base leading-7 text-text/75 sm:text-lg">{t.features.description}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text/75">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
