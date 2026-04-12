import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import { formatPrice } from './cartViewUtils';

type CartSummaryProps = {
  locale: CartLocale;
  t: CartTranslations;
  computedTotal: number;
  originalTotal: number;
  discountPercent: number;
  profit: number;
};

function SummaryContent({
  locale,
  t,
  computedTotal,
  originalTotal,
  discountPercent,
  profit,
  compact,
}: CartSummaryProps & { compact?: boolean }) {
  return (
    <>

      <div className={compact ? 'mt-3' : 'mt-6 border-t border-border pt-5'}>
        <div className="flex items-center justify-between">
          <span className={compact ? 'text-xl font-semibold text-text' : 'text-3xl font-semibold text-text'}>
            {t.finalPrice}
          </span>
          <span className={compact ? 'text-2xl font-semibold text-text' : 'text-3xl font-semibold text-text'}>
            {formatPrice(locale, computedTotal)} {t.currencyToman}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm text-text/70">
          <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-content">
            {discountPercent}% {t.discountLabel}
          </span>
          <span>
            {formatPrice(locale, originalTotal)} {t.currencyToman}
          </span>
        </div>

        <p className={compact ? 'mt-2 text-sm text-text' : 'mt-3 text-lg text-text'}>
          {t.yourProfit}{' '}
          <span className="font-medium text-primary">
            {formatPrice(locale, profit)} {t.currencyToman}
          </span>
        </p>

        <button
          type="button"
          className={
            compact
              ? 'mt-3 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-base font-semibold text-primary-content'
              : 'mt-6 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-content'
          }
        >
          {t.checkout}
        </button>
      </div>
    </>
  );
}

export function CartSummaryDesktop(props: CartSummaryProps) {
  return (
    <aside className="hidden rounded-3xl border border-border bg-surface p-5 lg:block">
      <SummaryContent {...props} />
    </aside>
  );
}

export function CartSummaryMobile(props: CartSummaryProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface p-3 lg:hidden">
      <div className="mx-auto w-full max-w-[560px]">
        <SummaryContent {...props} compact />
      </div>
    </div>
  );
}
