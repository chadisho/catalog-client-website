import { Eye } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeCatalogShowcaseSectionProps {
  t: HomeTranslations;
}

export default function HomeCatalogShowcaseSection({ t }: HomeCatalogShowcaseSectionProps) {
  const items = [
    {
      label: t.showcase.item1Label,
      name: t.showcase.item1Name,
      count: t.showcase.item1Count,
      gradient: 'from-pink-400 to-rose-600',
    },
    {
      label: t.showcase.item2Label,
      name: t.showcase.item2Name,
      count: t.showcase.item2Count,
      gradient: 'from-blue-400 to-indigo-600',
    },
    {
      label: t.showcase.item3Label,
      name: t.showcase.item3Name,
      count: t.showcase.item3Count,
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      label: t.showcase.item4Label,
      name: t.showcase.item4Name,
      count: t.showcase.item4Count,
      gradient: 'from-teal-400 to-emerald-600',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-background/50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 rounded-full mb-4">
            <Eye className="w-3.5 h-3.5 text-success" />
            <span className="text-xs font-semibold text-success uppercase tracking-wider">{t.showcase.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text">
            {t.showcase.title}
          </h2>
          <p className="mt-4 text-lg text-text/60">{t.showcase.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.label} className="card-hover group bg-surface rounded-2xl overflow-hidden border border-border shadow-sm">
              <div className="relative overflow-hidden">
                <div className={`w-full h-48 bg-gradient-to-br ${item.gradient} group-hover:scale-105 transition-transform duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 start-3 px-3 py-1 bg-surface/90 backdrop-blur-sm rounded-full text-xs font-semibold text-text">
                  {item.label}
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-text">{item.name}</h4>
                <p className="text-sm text-text/50 mt-1">{item.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
