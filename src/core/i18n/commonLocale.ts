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
    trustedByBadge: string;
    trustedByCount: string;
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
    item5Title: string;
    item5Description: string;
    item6Title: string;
    item6Description: string;
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
    demoTitle: string;
    demoDescription: string;
    demoCheck1: string;
    demoCheck2: string;
    demoCheck3: string;
    step1Action: string;
    step2Action: string;
    step3Action: string;
  };
  showcase: {
    badge: string;
    title: string;
    description: string;
    item1Label: string;
    item1Name: string;
    item1Count: string;
    item2Label: string;
    item2Name: string;
    item2Count: string;
    item3Label: string;
    item3Name: string;
    item3Count: string;
    item4Label: string;
    item4Name: string;
    item4Count: string;
  };
  testimonials: {
    badge: string;
    title: string;
    quote1: string;
    name1: string;
    role1: string;
    initials1: string;
    quote2: string;
    name2: string;
    role2: string;
    initials2: string;
    quote3: string;
    name3: string;
    role3: string;
    initials3: string;
  };
  pricing: {
    badge: string;
    title: string;
    description: string;
    mostPopular: string;
    plan1Name: string;
    plan1Price: string;
    plan1Period: string;
    plan1Desc: string;
    plan1Cta: string;
    plan1Feature1: string;
    plan1Feature2: string;
    plan1Feature3: string;
    plan1Feature4: string;
    plan2Name: string;
    plan2Price: string;
    plan2Period: string;
    plan2Desc: string;
    plan2Cta: string;
    plan2Feature1: string;
    plan2Feature2: string;
    plan2Feature3: string;
    plan2Feature4: string;
    plan2Feature5: string;
    plan2Feature6: string;
    plan3Name: string;
    plan3Price: string;
    plan3Period: string;
    plan3Desc: string;
    plan3Cta: string;
    plan3Feature1: string;
    plan3Feature2: string;
    plan3Feature3: string;
    plan3Feature4: string;
    plan3Feature5: string;
    plan3Feature6: string;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    badge1: string;
    badge2: string;
    badge3: string;
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
    q5: string;
    a5: string;
    q6: string;
    a6: string;
    q7: string;
    a7: string;
  };
  footer: {
    description: string;
    copyright: string;
    phoneLabel: string;
    mobileLabel: string;
    emailLabel: string;
    privacyLink: string;
    termsLink: string;
    educationLink: string;
    usefulLinks: string;
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
  backToLastContext: string;
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
