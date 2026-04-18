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
  profile: string;
  profileOrders: string;
  logout: string;
  openMenu: string;
  closeMenu: string;
  loginSheetTitle: string;
  loginSheetDescription: string;
  mobileLabel: string;
  mobilePlaceholder: string;
  sendOtp: string;
  otpLabel: string;
  otpPlaceholder: string;
  verifyOtp: string;
  resendOtp: string;
  backToMobile: string;
  close: string;
  authInvalidCellphone: string;
  authInvalidOtp: string;
  authGenericError: string;
  profilePageTitle: string;
  profileNotAuthenticated: string;
  profileFirstName: string;
  profileLastName: string;
  profileCellphone: string;
  profileCompany: string;
  profileGender: string;
  profileGenderMale: string;
  profileGenderFemale: string;
  profileGenderUnknown: string;
  profileEdit: string;
  profileEditPageTitle: string;
  profileSave: string;
  profileCancel: string;
  profileEditSuccessToast: string;
  profileEditErrorToast: string;
  profileViewOrders: string;
  ordersPageTitle: string;
  ordersNotAuthenticated: string;
  ordersEmptyTitle: string;
  ordersEmptyDescription: string;
  orderCode: string;
  orderStatus: string;
  orderDate: string;
  orderTotalAmount: string;
  orderItemsCount: string;
  orderProductFallback: string;
  orderStatusPending: string;
  orderStatusCompleted: string;
  orderStatusCanceled: string;
  orderStatusReturned: string;
  orderStatusUnknown: string;
  paginationPrevious: string;
  paginationNext: string;
  paginationPageLabel: string;
  orderDetailsTitle: string;
  orderDetailsIdLabel: string;
  orderDetailsBack: string;
  orderDetailsEmptyTitle: string;
  orderDetailsEmptyDescription: string;
  orderDetailsQtyPrice: string;
  orderDetailsSubtotal: string;
  orderDetailsVariationFallback: string;
  orderDetailsProductFallback: string;
  orderDetailsMakingDuration: string;
  orderDetailsTotal: string;
  orderViewDetails: string;
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