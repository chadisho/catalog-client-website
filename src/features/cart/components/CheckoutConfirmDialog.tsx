"use client";

import { X } from 'lucide-react';
import AppDialog from '../../../core/components/dialog/AppDialog';
import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';

type CheckoutConfirmDialogProps = {
  isOpen: boolean;
  locale: CartLocale;
  t: CartTranslations;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CheckoutConfirmDialog({
  isOpen,
  locale,
  t,
  isSubmitting,
  onClose,
  onConfirm,
}: CheckoutConfirmDialogProps) {
  if (!isOpen) {
    return null;
  }

  const isRtl = locale === 'fa';

  return (
    <AppDialog
      isOpen={isOpen}
      onClose={onClose}
      closeLabel={t.close}
      panelClassName="relative w-full rounded-t-3xl border border-border bg-background px-5 pb-6 pt-5 text-text shadow-2xl lg:max-w-[480px] lg:rounded-3xl lg:px-6 lg:pb-7 lg:pt-6"
    >
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <div className={`mb-3 flex items-center ${isRtl ? 'justify-start' : 'justify-end'}`}>
          <button
            type="button"
            aria-label={t.close}
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full p-2 text-text/70 transition hover:bg-muted disabled:opacity-60"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-semibold">{t.checkoutConfirmTitle}</h2>
          <p className="text-sm text-text/70">{t.checkoutConfirmDescription}</p>

          <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isSubmitting}
              className="h-12 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-content disabled:opacity-60"
            >
              {t.checkoutConfirmAction}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-12 rounded-xl border border-border px-4 text-sm text-text/85 disabled:opacity-60"
            >
              {t.checkoutCancelAction}
            </button>
          </div>
        </div>
      </div>
    </AppDialog>
  );
}
