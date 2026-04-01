export type CatalogLocale = 'fa' | 'en';

type CatalogTranslations = {
  defaultProductTitle: string;
  noUnit: string;
  hasDiscount: string;
  outOfStock: string;
  errorOccurred: string;
  loading: string;
  noContent: string;
};

const catalogTranslations: Record<CatalogLocale, CatalogTranslations> = {
  fa: {
    defaultProductTitle: 'محصول',
    noUnit: 'بدون واحد',
    hasDiscount: 'دارای تخفیف',
    outOfStock: 'فعلا ناموجود',
    errorOccurred: 'خطایی رخ داده است',
    loading: 'در حال بارگذاری...',
    noContent: 'محتوایی برای نمایش وجود ندارد.',
  },
  en: {
    defaultProductTitle: 'Product',
    noUnit: 'No unit',
    hasDiscount: 'Discounted',
    outOfStock: 'Out of stock',
    errorOccurred: 'Error occurred',
    loading: 'Loading...',
    noContent: 'No content available to display.',
  },
};

export function resolveCatalogLocale(language?: string | null): CatalogLocale {
  return language?.toLowerCase().startsWith('fa') ? 'fa' : 'en';
}

export function getCatalogTranslations(locale: CatalogLocale): CatalogTranslations {
  return catalogTranslations[locale];
}

export function getCatalogDirection(locale: CatalogLocale): 'rtl' | 'ltr' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

export function getCatalogTextAlignClass(locale: CatalogLocale): 'text-right' | 'text-left' {
  return locale === 'fa' ? 'text-right' : 'text-left';
}

export function getLocalizedCurrencyLabel(currency: string, locale: CatalogLocale): string {
  if (currency.toLowerCase() === 'toman') {
    return locale === 'fa' ? 'تومان' : 'toman';
  }

  return currency;
}