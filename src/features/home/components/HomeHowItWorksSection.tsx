import { CheckCircle, Palette, Rocket, Share2, UploadCloud } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeHowItWorksSectionProps {
  t: HomeTranslations;
}

export default function HomeHowItWorksSection({ t }: HomeHowItWorksSectionProps) {
  const steps = [
    {
      num: '1',
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Description,
      action: t.howItWorks.step1Action,
      actionIcon: UploadCloud,
      badgeBg: 'bg-primary',
      shadow: 'shadow-primary/30',
      actionColor: 'text-primary',
    },
    {
      num: '2',
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Description,
      action: t.howItWorks.step2Action,
      actionIcon: Palette,
      badgeBg: 'bg-purple-600',
      shadow: 'shadow-purple-600/30',
      actionColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      num: '3',
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Description,
      action: t.howItWorks.step3Action,
      actionIcon: Share2,
      badgeBg: 'bg-warning',
      shadow: 'shadow-warning/30',
      actionColor: 'text-warning',
    },
  ];


  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-warning/10 border border-warning/20 rounded-full mb-4">
            <Rocket className="w-3.5 h-3.5 text-warning" />
            <span className="text-xs font-semibold text-warning uppercase tracking-wider">{t.howItWorks.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text">
            {t.howItWorks.title}
          </h2>
          <p className="mt-4 text-lg text-text/60">{t.howItWorks.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          <div
            className="hidden md:block absolute top-8 start-[20%] end-[20%] h-0.5"
            style={{
              background: 'linear-gradient(90deg, var(--color-primary), #9333ea, var(--color-warning))',
              opacity: 0.3,
            }}
          />
          {steps.map((step) => (
            <div key={step.num} className="text-center relative">
              <div
                className={`w-16 h-16 mx-auto rounded-2xl ${step.badgeBg} text-white flex items-center justify-center text-2xl font-extrabold shadow-xl ${step.shadow} mb-6 relative z-10`}
              >
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-text mb-3">{step.title}</h3>
              <p className="text-text/60 leading-relaxed">{step.description}</p>
              {/*<div className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${step.actionColor}`}>
                <step.actionIcon className="w-4 h-4" />
                {step.action}
              </div>*/}
            </div>
          ))}
        </div>

              {/*<CatalogInActionComponnent t={t}/>*/}
      </div>
    </section>
  );
}

export function CatalogInActionComponnent({ t }: HomeHowItWorksSectionProps) { 
      const checks = [t.howItWorks.demoCheck1, t.howItWorks.demoCheck2, t.howItWorks.demoCheck3];

    return (
        <div
          className="mt-20 relative rounded-3xl overflow-hidden px-8 py-12 sm:px-12 lg:px-16"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), color-mix(in oklch, var(--color-primary) 80%, black))',
          }}
        >
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-10 start-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 end-10 w-60 h-60 bg-warning rounded-full blur-3xl" />
          </div>
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{t.howItWorks.demoTitle}</h3>
              <p className="text-primary-content/70 leading-relaxed mb-6">{t.howItWorks.demoDescription}</p>
              <div className="flex flex-wrap gap-4">
                {checks.map((check) => (
                  <div key={check} className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    {check}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl border border-white/20 p-6 backdrop-blur-sm">
              <div className="bg-surface rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-neutral px-4 py-2.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger" />
                  <span className="w-2.5 h-2.5 rounded-full bg-warning" />
                  <span className="w-2.5 h-2.5 rounded-full bg-success" />
                  <span className="text-neutral-content text-[10px] ms-2">chadisho.com/demo</span>
                </div>
                <div
                  className="w-full h-48 sm:h-56 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), color-mix(in oklch, var(--color-primary) 60%, var(--color-warning)))' }}
                >
                  <div className="text-center text-white/60">
                    <Share2 className="w-16 h-16 mx-auto mb-3" />
                    <p className="text-sm font-medium">{t.hero.mockupAlt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}