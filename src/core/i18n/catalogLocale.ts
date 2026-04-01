export type CatalogLocale = 'fa' | 'en';

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
};

const catalogTranslations: Record<CatalogLocale, CatalogTranslations> = {
  fa: {
    defaultProductTitle: 'محصول',
    defaultCatalogTitle: 'نام کاتالوگ',
    noUnit: 'بدون واحد',
    hasDiscount: 'دارای تخفیف',
    outOfStock: 'فعلا ناموجود',
    errorOccurred: 'خطایی رخ داده است',
    loading: 'در حال بارگذاری...',
    noContent: 'محتوایی برای نمایش وجود ندارد.',
    searchPlaceholder: 'جستجوی محصولات',
    login: 'ورود به حساب کاربری',
    cart: 'سبد خرید',
    language: 'زبان',
    languageFa: 'فارسی',
    languageEn: 'English',
    theme: 'پوسته',
    themeSystem: 'سیستم',
    themeLight: 'روشن',
    themeDark: 'تیره',
    brand: 'چادیشو',
  },
  en: {
    defaultProductTitle: 'Product',
    defaultCatalogTitle: 'Catalog',
    noUnit: 'No unit',
    hasDiscount: 'Discounted',
    outOfStock: 'Out of stock',
    errorOccurred: 'Error occurred',
    loading: 'Loading...',
    noContent: 'No content available to display.',
    searchPlaceholder: 'Search products',
    login: 'Sign in',
    cart: 'Cart',
    language: 'Language',
    languageFa: 'فارسی',
    languageEn: 'English',
    theme: 'Theme',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    brand: 'Chadisho',
  },
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