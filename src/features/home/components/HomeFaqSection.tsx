import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeFaqSectionProps {
  t: HomeTranslations;
}

export default function HomeFaqSection({ t }: HomeFaqSectionProps) {
  const faqItems = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
  ];

  return (
    <section id="faq" className="border-b border-border bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {t.faq.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl">{t.faq.title}</h2>
          <p className="mt-4 text-base leading-7 text-text/75 sm:text-lg">{t.faq.description}</p>
        </div>

        <div className="mt-10 space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-2xl border border-border bg-surface p-4">
              <summary className="cursor-pointer list-none text-base font-semibold text-text">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-text/75">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
