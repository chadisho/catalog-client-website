'use client';

import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getAuthSession, requestLogin, resendOtp, verifyOtp } from '../api/authClientApi';
import type { CatalogLocale } from '../../../core/i18n/catalogLocale';

type AuthSheetTranslations = {
  loginSheetTitle: string;
  loginSheetDescription: string;
  mobileLabel: string;
  mobilePlaceholder: string;
  sendOtp: string;
  otpLabel: string;
  otpPlaceholder: string;
  verifyOtp: string;
  resendOtp: string;
  backToMobile: string;
  close: string;
  authInvalidCellphone: string;
  authInvalidOtp: string;
  authGenericError: string;
};

type LoginSheetProps = {
  isOpen: boolean;
  locale: CatalogLocale;
  t: AuthSheetTranslations;
  onClose: () => void;
  onLoginSuccess: () => void;
};

type LoginStep = 'mobile' | 'otp';

function resolveErrorMessage(message: string, t: AuthSheetTranslations): string {
  const normalized = message.toLowerCase();

  if (normalized.includes('cellphone') || normalized.includes('mobile')) {
    return t.authInvalidCellphone;
  }

  if (normalized.includes('otp')) {
    return t.authInvalidOtp;
  }

  return t.authGenericError;
}

export default function LoginSheet({ isOpen, locale, t, onClose, onLoginSuccess }: LoginSheetProps) {
  const [step, setStep] = useState<LoginStep>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loginToken, setLoginToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const direction = useMemo(() => (locale === 'fa' ? 'rtl' : 'ltr'), [locale]);
  const isRtl = direction === 'rtl';

  useEffect(() => {
    if (!isOpen) {
      setStep('mobile');
      setMobile('');
      setOtp('');
      setLoginToken('');
      setIsSubmitting(false);
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleRequestOtp = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await requestLogin(mobile);

      if (!response.loginToken) {
        throw new Error('missing_login_token');
      }

      setLoginToken(response.loginToken);
      setStep('otp');
    } catch (error) {
      const message = error instanceof Error ? error.message : t.authGenericError;
      setErrorMessage(resolveErrorMessage(message, t));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!loginToken) {
      setErrorMessage(t.authGenericError);
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await verifyOtp(otp, loginToken);
      await getAuthSession();
      onLoginSuccess();
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : t.authGenericError;
      setErrorMessage(resolveErrorMessage(message, t));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (!loginToken || isSubmitting) {
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const nextToken = await resendOtp(loginToken);
      setLoginToken(nextToken);
    } catch (error) {
      const message = error instanceof Error ? error.message : t.authGenericError;
      setErrorMessage(resolveErrorMessage(message, t));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/45 lg:items-center lg:justify-center"
      dir={direction}
      role="dialog"
      aria-modal
    >
      <button type="button" aria-label={t.close} className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full rounded-t-3xl border border-secondary/30 bg-background px-5 pb-6 pt-5 text-text shadow-2xl dark:bg-black dark:text-white lg:max-w-[480px] lg:rounded-3xl lg:px-6 lg:pb-7 lg:pt-6">
        <div className={`mb-3 flex items-center ${isRtl ? 'justify-start' : 'justify-end'}`}>
          <button
            type="button"
            aria-label={t.close}
            onClick={onClose}
            className="rounded-full p-2 text-text/70 transition hover:bg-secondary/20 dark:text-white/80 dark:hover:bg-white/10"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-semibold">{t.loginSheetTitle}</h2>
          <p className="text-sm text-text/70 dark:text-white/75">{t.loginSheetDescription}</p>

          {step === 'mobile' ? (
            <>
              <label className="block text-sm text-text/90 dark:text-white/90" htmlFor="auth-mobile-input">
                {t.mobileLabel}
              </label>
              <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="inline-flex h-12 min-w-[64px] items-center justify-center rounded-md border border-secondary/40 bg-background/80 text-sm text-text/75 dark:border-white/35 dark:bg-white/5 dark:text-white/80">
                  +98
                </div>
                <input
                  id="auth-mobile-input"
                  type="tel"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  placeholder={t.mobilePlaceholder}
                  className="h-12 flex-1 rounded-md border border-secondary/40 bg-background/80 px-3 text-sm text-text outline-none ring-primary placeholder:text-text/45 focus:ring-2 dark:border-white/35 dark:bg-white/5 dark:text-white dark:placeholder:text-white/45"
                />
              </div>
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-primary text-sm font-semibold text-white disabled:opacity-60"
              >
                {t.sendOtp}
              </button>
            </>
          ) : (
            <>
              <label className="block text-sm text-text/90 dark:text-white/90" htmlFor="auth-otp-input">
                {t.otpLabel}
              </label>
              <input
                id="auth-otp-input"
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder={t.otpPlaceholder}
                className="h-12 w-full rounded-md border border-secondary/40 bg-background/80 px-3 text-sm text-text outline-none ring-primary placeholder:text-text/45 focus:ring-2 dark:border-white/35 dark:bg-white/5 dark:text-white dark:placeholder:text-white/45"
              />

              <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isSubmitting}
                  className="h-12 flex-1 rounded-xl bg-primary text-sm font-semibold text-white disabled:opacity-60"
                >
                  {t.verifyOtp}
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isSubmitting}
                  className="h-12 rounded-xl border border-secondary/40 px-4 text-sm text-text/85 disabled:opacity-60 dark:border-white/35 dark:text-white/85"
                >
                  {t.resendOtp}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep('mobile');
                  setOtp('');
                  setErrorMessage(null);
                }}
                className="text-sm text-text/70 underline underline-offset-4 dark:text-white/70"
              >
                {t.backToMobile}
              </button>
            </>
          )}

          {errorMessage ? <p className="text-sm text-danger">{errorMessage}</p> : null}
        </div>
      </div>
    </div>
  );
}
