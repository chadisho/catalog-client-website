import { getMessages } from './messages';

export type CommonLocale = 'fa' | 'en';

type CommonTranslations = {
  loading: string;
  errorTitle: string;
  errorDescription: string;
  retry: string;
};

export type HomeTranslations = {
  title: string;
  meta: {
    title: string;
    description: string;
  };
  brand: {
    en: string;
    fa: string;
    combined: string;
  };
  nav: {
    features: string;
    howItWorks: string;
    download: string;
    faq: string;
    language: string;
    languageFa: string;
    languageEn: string;
    theme: string;
    themeSystem: string;
    themeLight: string;
    themeDark: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
      secondaryCta: string;
    mockupAlt: string;
      sampleProductTitle1: string;
    sampleProductPrice1: string;
      sampleProductTitle2: string;
    sampleProductPrice2: string;
      sampleProductTitle3: string;
    sampleProductPrice3: string;
      sampleProductTitle4: string;
    sampleProductPrice4: string;
      sampleHeroTitle: string;
      sampleHeroDescription: string;
      sampleHeroSubtitle: string;
    sampleHeroSubtitleDescription: string;
  };
  features: {
    badge: string;
    title: string;
    description: string;
    item1Title: string;
    item1Description: string;
    item2Title: string;
    item2Description: string;
    item3Title: string;
    item3Description: string;
    item4Title: string;
    item4Description: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    description: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
  };
  download: {
    badge: string;
    title: string;
    description: string;
    android: string;
    ios: string;
    pwa: string;
    soonTag: string;
    note: string;
  };
  faq: {
    badge: string;
    title: string;
    description: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
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
  outOfStock: string;
  notEnoughStockToast: string;
  currencyToman: string;
  mediaImageAlt: string;
  mediaVideoAlt: string;
  openSelectionSheet: string;
  closeSelectionSheet: string;
  addToCartSuccess: string;
  addToCartError: string;
  addToCartToastSuccess: string;
  addToCartToastError: string;
  addToCartToastActionCart: string;
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
