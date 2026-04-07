import { ArrowRight, ShoppingCart } from 'lucide-react';
import type { CartTranslations } from '../../../core/i18n/cartLocale';

type CartHeaderBlockProps = {
  t: CartTranslations;
};

export default function CartHeaderBlock({ t }: CartHeaderBlockProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text/80"
          aria-label={t.back}
          title={t.back}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="rounded-2xl bg-surface p-4 text-center lg:text-right">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary lg:hidden">
          <ShoppingCart className="h-8 w-8" />
        </div>
        <h1 className="mt-2 text-3xl font-semibold text-text">{t.title}</h1>
        <p className="mt-2 text-sm leading-7 text-text/75">{t.description}</p>
        <div className="mt-4 rounded-xl bg-warning/15 px-3 py-2 text-xs text-warning-content">
          {t.selectionInfo}
        </div>
      </div>
    </>
  );
}
