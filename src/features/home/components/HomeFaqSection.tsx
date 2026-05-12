"use client";

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeFaqSectionProps {
  t: HomeTranslations;
}

export default function HomeFaqSection({ t }: HomeFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 },
    { question: t.faq.q7, answer: t.faq.a7 },
  ];

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-20 lg:py-32 bg-background/50">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {t.faq.badge}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-text">{t.faq.title}</h2>
          <p className="mt-4 text-lg text-text/60">{t.faq.description}</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={item.question} className="border border-border rounded-2xl overflow-hidden bg-surface">
              <button
                type="button"
                className="w-full flex items-center justify-between p-5 text-start hover:bg-muted/50 transition-colors"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-text pe-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-text/50 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIndex === i ? '500px' : '0px' }}
              >
                <p className="px-5 pb-5 text-text/60 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
