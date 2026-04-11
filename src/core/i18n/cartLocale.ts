import { getMessages } from './messages';

export type CartLocale = 'fa' | 'en';

export type CartTranslations = {
  title: string;
  description: string;
  hint: string;
  selectionInfo: string;
  summaryInfo: string;
  readyItemsTitle: string;
  productCodeLabel: string;
  singleVariation: string;
  allVariations: string;
  limitedCount: string;
  singleByEachVariant: string;
  closedProduct: string;
  viewProduct: string;
  addItem: string;
  finalPrice: string;
  yourProfit: string;
  checkout: string;
  currencyToman: string;
  discountLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  deleteItem: string;
  editVariation: string;
  increaseQuantity: string;
  decreaseQuantity: string;
  collapseGroup: string;
  expandGroup: string;
  alertLabel: string;
  back: string;
  updateItemError: string;
  deleteItemError: string;
  authRequiredTitle: string;
  authRequiredDescription: string;
  authRequiredAction: string;
};

export function getCartTranslations(locale: CartLocale): CartTranslations {
  return getMessages(locale).cart;
}

export function getCartDirection(locale: CartLocale): 'rtl' | 'ltr' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}
