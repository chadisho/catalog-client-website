import { getMessages } from './messages';

export type CommonLocale = 'fa' | 'en';

type CommonTranslations = {
  loading: string;
  errorTitle: string;
  errorDescription: string;
  retry: string;
};

type HomeTranslations = {
  title: string;
};

export type ProductTranslations = {
  detailsTitle: string;
  codeLabel: string;
  descriptionLabel: string;
  moreDescription: string;
  lessDescription: string;
  showSpecs: string;
  hideSpecs: string;
  variationLabel: string;
  quantityLabel: string;
  increaseQuantity: string;
  decreaseQuantity: string;
  addToCart: string;
  confirmSelection: string;
  technicalSpecsTitle: string;
  priceLabel: string;
  originalPriceLabel: string;
  discountLabel: string;
  noPrice: string;
  stockWarning: string;
  currencyToman: string;
  mediaImageAlt: string;
  mediaVideoAlt: string;
  openSelectionSheet: string;
  closeSelectionSheet: string;
  addToCartSuccess: string;
  addToCartError: string;
  addToCartToastSuccess: string;
  addToCartToastError: string;
};

type ShopTranslations = {
  profileTitle: string;
  aboutTitle: string;
  contactTitle: string;
  addressesTitle: string;
  moreDescription: string;
  lessDescription: string;
  instagram: string;
  whatsapp: string;
  telegram: string;
  website: string;
  call: string;
  emptyContacts: string;
  emptyDescription: string;
};

type ThemeTranslations = {
  light: string;
  dark: string;
};

export function resolveCommonLocale(language?: string | null): CommonLocale {
  return language?.toLowerCase().includes('fa') ? 'fa' : 'en';
}

export function getCommonTranslations(locale: CommonLocale): CommonTranslations {
  return getMessages(locale).common;
}

export function getCommonDirection(locale: CommonLocale): 'rtl' | 'ltr' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

export function getHomeTranslations(locale: CommonLocale): HomeTranslations {
  return getMessages(locale).home;
}

export function getProductTranslations(locale: CommonLocale): ProductTranslations {
  return getMessages(locale).product;
}

export function getShopTranslations(locale: CommonLocale): ShopTranslations {
  return getMessages(locale).shop;
}

export function getThemeTranslations(locale: CommonLocale): ThemeTranslations {
  return getMessages(locale).theme;
}
