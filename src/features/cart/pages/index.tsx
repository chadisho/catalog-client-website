import Header from '../../../core/components/Header';
import ErrorState from '../../../core/components/feedback/ErrorState';
import {
  getCartDirection,
  getCartTranslations,
  type CartLocale,
} from '../../../core/i18n/cartLocale';
import { getCatalogTranslations } from '../../../core/i18n/catalogLocale';
import type { CartModel } from '../model/cartModel';
import CartView from '../components/CartView';

type CartPageProps = {
  data?: CartModel;
  error?: string;
  locale: CartLocale;
};

export default function CartPage({ data, error, locale }: CartPageProps) {
  const t = getCartTranslations(locale);
  const headerT = getCatalogTranslations(locale);
  const direction = getCartDirection(locale);

  if (error) {
    return <ErrorState locale={locale} />;
  }

  if (!data) {
    return <ErrorState locale={locale} />;
  }

  return (
    <div dir={direction} className="min-h-screen bg-background text-text">
      <Header locale={locale} t={headerT} hideSearchInput />
      <CartView locale={locale} t={t} cart={data} />
    </div>
  );
}
