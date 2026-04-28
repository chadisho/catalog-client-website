import { getCommonDirection, getCommonTranslations, type CommonLocale } from '../../i18n/commonLocale';

interface ErrorStateProps {
  locale?: CommonLocale;
  onRetry?: () => void;
  message?: string;
}

export default function ErrorState({ locale = 'en', onRetry, message }: ErrorStateProps) {
  const t = getCommonTranslations(locale);
  const direction = getCommonDirection(locale);
  const normalizedMessage = message?.trim();
  const shouldShowDefaultMessage = !normalizedMessage || normalizedMessage.startsWith('HTTP');

  return (
    <div dir={direction} className="flex min-h-[40vh] items-center justify-center bg-background p-6 text-text">
      <div className="w-full max-w-md rounded-xl border border-border bg-background px-6 py-5 text-center">
        <p className="text-base font-semibold text-text">{t.errorTitle}</p>
        <p className="mt-2 text-sm text-text/80">
          {shouldShowDefaultMessage ? t.errorDescription : normalizedMessage}
        </p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t.retry}
          </button>
        ) : null}
      </div>
    </div>
  );
}
