export type CommonLocale = 'fa' | 'en';

type CommonTranslations = {
  loading: string;
  errorTitle: string;
  errorDescription: string;
  retry: string;
};

const commonTranslations: Record<CommonLocale, CommonTranslations> = {
  fa: {
    loading: 'در حال بارگذاری...',
    errorTitle: 'خطایی رخ داده است',
    errorDescription: 'لطفاً دوباره تلاش کنید.',
    retry: 'تلاش مجدد',
  },
  en: {
    loading: 'Loading...',
    errorTitle: 'Something went wrong',
    errorDescription: 'Please try again.',
    retry: 'Try again',
  },
};

export function resolveCommonLocale(language?: string | null): CommonLocale {
  return language?.toLowerCase().includes('fa') ? 'fa' : 'en';
}

export function getCommonTranslations(locale: CommonLocale): CommonTranslations {
  return commonTranslations[locale];
}

export function getCommonDirection(locale: CommonLocale): 'rtl' | 'ltr' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}
