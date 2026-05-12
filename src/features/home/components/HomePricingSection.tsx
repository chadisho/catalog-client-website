import { Check, Tag, X } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomePricingSectionProps {
  t: HomeTranslations;
}

export default function HomePricingSection({ t }: HomePricingSectionProps) {
  const plans = [
    {
      name: t.pricing.plan1Name,
      price: t.pricing.plan1Price,
      period: t.pricing.plan1Period,
      desc: t.pricing.plan1Desc,
      cta: t.pricing.plan1Cta,
      featured: false,
      features: [
        { text: t.pricing.plan1Feature1, included: true },
        { text: t.pricing.plan1Feature2, included: true },
        { text: t.pricing.plan1Feature3, included: true },
        { text: t.pricing.plan1Feature4, included: true },
        { text: t.pricing.plan2Feature5, included: false },
        { text: t.pricing.plan2Feature6, included: false },
      ],
    },
    {
      name: t.pricing.plan2Name,
      price: t.pricing.plan2Price,
      period: t.pricing.plan2Period,
      desc: t.pricing.plan2Desc,
      cta: t.pricing.plan2Cta,
      featured: true,
      features: [
        { text: t.pricing.plan2Feature1, included: true },
        { text: t.pricing.plan2Feature2, included: true },
        { text: t.pricing.plan2Feature3, included: true },
        { text: t.pricing.plan2Feature4, included: true },
        { text: t.pricing.plan2Feature5, included: true },
        { text: t.pricing.plan2Feature6, included: true },
      ],
    },
    {
      name: t.pricing.plan3Name,
      price: t.pricing.plan3Price,
      period: t.pricing.plan3Period,
      desc: t.pricing.plan3Desc,
      cta: t.pricing.plan3Cta,
      featured: false,
      features: [
        { text: t.pricing.plan3Feature1, included: true },
        { text: t.pricing.plan3Feature2, included: true },
        { text: t.pricing.plan3Feature3, included: true },
        { text: t.pricing.plan3Feature4, included: true },
        { text: t.pricing.plan3Feature5, included: true },
        { text: t.pricing.plan3Feature6, included: true },
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-background/50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full mb-4">
            <Tag className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{t.pricing.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-lg text-text/60">{t.pricing.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card-hover relative rounded-2xl p-8 ${
                plan.featured
                  ? 'bg-surface border-2 border-primary shadow-xl shadow-primary/10'
                  : 'bg-surface border border-border shadow-sm'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 start-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-content text-xs font-bold rounded-full whitespace-nowrap">
                  {t.pricing.mostPopular}
                </div>
              )}
              <h3 className="text-lg font-bold text-text">{plan.name}</h3>
              <p className="text-sm text-text/50 mt-1">{plan.desc}</p>
              <div className="mt-6">
                <span className="text-5xl font-extrabold text-text">{plan.price}</span>
                <span className="text-text/50 text-sm">{plan.period}</span>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f.text} className={`flex items-center gap-3 text-sm ${f.included ? 'text-text/80' : 'text-text/40'}`}>
                    {f.included ? (
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-border flex-shrink-0" />
                    )}
                    {f.text}
                  </li>
                ))}
              </ul>
              <a
                href="#download"
                className={`mt-8 block text-center font-semibold py-3 rounded-xl transition-colors ${
                  plan.featured
                    ? 'btn-shine text-primary-content bg-primary hover:opacity-90 shadow-lg shadow-primary/25'
                    : 'text-primary bg-primary/10 hover:bg-primary/20'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
