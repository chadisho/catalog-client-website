import { getCommonDirection, getCommonTranslations, type CommonLocale } from '../../i18n/commonLocale';

interface LoadingStateProps {
  locale?: CommonLocale;
}

export default function LoadingState({ locale = 'en' }: LoadingStateProps) {
  const t = getCommonTranslations(locale);
  const direction = getCommonDirection(locale);

  return (
    <div dir={direction} className="flex min-h-[40vh] items-center justify-center bg-background p-6 text-text">
      <div className="rounded-xl border border-secondary/30 bg-background px-6 py-4 text-sm text-text/80">
        {t.loading}
      </div>
    </div>
  );
}
