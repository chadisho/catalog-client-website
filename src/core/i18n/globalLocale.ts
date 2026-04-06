export type AppLocale = 'fa' | 'en';

export const LOCALE_COOKIE_KEY = 'locale';

export function resolveAppLocale(input?: string | null): AppLocale | undefined {
  if (!input) {
    return undefined;
  }

  const normalizedInput = input.toLowerCase().trim();

  if (normalizedInput.startsWith('fa') || normalizedInput.includes(',fa')) {
    return 'fa';
  }

  if (normalizedInput.startsWith('en') || normalizedInput.includes(',en')) {
    return 'en';
  }

  return undefined;
}

export function getDirectionByLocale(locale: AppLocale): 'rtl' | 'ltr' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}
