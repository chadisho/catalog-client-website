import { BarChart3, Link2, LayoutGrid, Smartphone, Sparkles, UploadCloud, Zap } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeFeaturesSectionProps {
  t: HomeTranslations;
}

export default function HomeFeaturesSection({ t }: HomeFeaturesSectionProps) {
  const items = [
    { title: t.features.item1Title, description: t.features.item1Description, icon: UploadCloud, iconBg: 'bg-primary/10', iconColor: 'text-primary' },
    { title: t.features.item2Title, description: t.features.item2Description, icon: LayoutGrid, iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400' },
    { title: t.features.item3Title, description: t.features.item3Description, icon: Link2, iconBg: 'bg-success/10', iconColor: 'text-success' },
    { title: t.features.item4Title, description: t.features.item4Description, icon: Sparkles, iconBg: 'bg-warning/10', iconColor: 'text-warning' },
    { title: t.features.item5Title, description: t.features.item5Description, icon: Smartphone, iconBg: 'bg-info/10', iconColor: 'text-info' },
    { title: t.features.item6Title, description: t.features.item6Description, icon: BarChart3, iconBg: 'bg-danger/10', iconColor: 'text-danger' },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-background/50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{t.features.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text">
            {t.features.title}
          </h2>
          <p className="mt-4 text-lg text-text/60">{t.features.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <article key={item.title} className="card-hover bg-surface rounded-2xl p-7 border border-border shadow-sm">
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-5`}>
                <item.icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{item.title}</h3>
              <p className="text-text/60 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
