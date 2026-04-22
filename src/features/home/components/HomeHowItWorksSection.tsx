import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeHowItWorksSectionProps {
  t: HomeTranslations;
}

export default function HomeHowItWorksSection({ t }: HomeHowItWorksSectionProps) {
  const steps = [
    { title: t.howItWorks.step1Title, description: t.howItWorks.step1Description },
    { title: t.howItWorks.step2Title, description: t.howItWorks.step2Description },
    { title: t.howItWorks.step3Title, description: t.howItWorks.step3Description },
  ];

  return (
    <section id="how-it-works" className="border-b border-border/70 bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {t.howItWorks.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl">{t.howItWorks.title}</h2>
          <p className="mt-4 text-base leading-7 text-text/75 sm:text-lg">{t.howItWorks.description}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-content">
                {index + 1}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text/75">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
