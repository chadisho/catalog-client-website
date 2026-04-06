export type CatalogLocale = 'fa' | 'en';
import { getMessages } from './messages';

type CatalogTranslations = {
  defaultProductTitle: string;
  defaultCatalogTitle: string;
  noUnit: string;
  hasDiscount: string;
  outOfStock: string;
  errorOccurred: string;
  loading: string;
  noContent: string;
  searchPlaceholder: string;
  login: string;
  cart: string;
  language: string;
  languageFa: string;
  languageEn: string;
  theme: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
  brand: string;
  discountLabel: string;
  lowStockWarning: string;
  currencyToman: string;
};

export function resolveCatalogLocale(language?: string | null): CatalogLocale {
  return language?.toLowerCase().startsWith('fa') ? 'fa' : 'en';
}

export function resolveRequestedCatalogLocale(language?: string | null): CatalogLocale | undefined {
  if (!language) {
    return undefined;
  }

  return resolveCatalogLocale(language);
}

export function getCatalogTranslations(locale: CatalogLocale): CatalogTranslations {
  return getMessages(locale).catalog;
}

export function getCatalogDirection(locale: CatalogLocale): 'rtl' | 'ltr' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

export function getCatalogTextAlignClass(locale: CatalogLocale): 'text-right' | 'text-left' {
  return locale === 'fa' ? 'text-right' : 'text-left';
}

export function getLocalizedCurrencyLabel(currency: string, locale: CatalogLocale): string {
  if (currency.toLowerCase() === 'toman') {
    return getMessages(locale).catalog.currencyToman;
  }

  return currency;
}