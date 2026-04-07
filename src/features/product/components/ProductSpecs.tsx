'use client';

import { useState } from 'react';

type ProductSpecsProps = {
  title: string;
  showText: string;
  hideText: string;
  specs: Array<{ key: string; value: string }>;
};

export default function ProductSpecs({ title, showText, hideText, specs }: ProductSpecsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (specs.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-primary"
        >
          {isOpen ? hideText : showText}
        </button>
      </div>

      {isOpen ? (
        <dl className="mt-4 divide-y divide-secondary/20 rounded-xl border border-secondary/25">
          {specs.map((item) => (
            <div key={`${item.key}-${item.value}`} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
              <dt className="text-text/70">{item.key}</dt>
              <dd className="font-medium text-text">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
