import { Heart, Star } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeTestimonialsSectionProps {
  t: HomeTranslations;
}

export default function HomeTestimonialsSection({ t }: HomeTestimonialsSectionProps) {
  const testimonials = [
    { quote: t.testimonials.quote1, name: t.testimonials.name1, role: t.testimonials.role1, initials: t.testimonials.initials1, color: 'bg-primary/10 text-primary' },
    { quote: t.testimonials.quote2, name: t.testimonials.name2, role: t.testimonials.role2, initials: t.testimonials.initials2, color: 'bg-success/10 text-success' },
    { quote: t.testimonials.quote3, name: t.testimonials.name3, role: t.testimonials.role3, initials: t.testimonials.initials3, color: 'bg-warning/10 text-warning' },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-warning/10 border border-warning/20 rounded-full mb-4">
            <Heart className="w-3.5 h-3.5 text-warning" />
            <span className="text-xs font-semibold text-warning uppercase tracking-wider">{t.testimonials.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="card-hover bg-surface rounded-2xl p-7 border border-border shadow-sm"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>
              <p className="text-text/70 leading-relaxed mb-6">"{item.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                  {item.initials}
                </div>
                <div>
                  <p className="font-semibold text-text text-sm">{item.name}</p>
                  <p className="text-xs text-text/50">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
