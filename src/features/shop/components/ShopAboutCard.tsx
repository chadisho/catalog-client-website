'use client';

import { useState } from 'react';
import ShopDescription from './ShopDescription';

type ShopAboutCardProps = {
  title: string;
  description: string;
  moreLabel: string;
  lessLabel: string;
};

export default function ShopAboutCard({
  title,
  description,
  moreLabel,
  lessLabel,
}: ShopAboutCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="space-y-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <h2 className="text-xl font-semibold text-text">{title}</h2>
      <ShopDescription
        description={description}
        expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
        moreLabel={moreLabel}
        lessLabel={lessLabel}
      />
    </section>
  );
}
