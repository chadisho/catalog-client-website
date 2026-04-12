import { getCatalogDirection, getCatalogTranslations } from '../../../../core/i18n/catalogLocale';
import type { AppLocale } from '../../../../core/i18n/globalLocale';
import ErrorState from '../../../../core/components/feedback/ErrorState';
import { getOrdersList } from '../../api/orderApi';
import OrdersList from '../../components/OrdersList';
import Header from '../../../../core/components/Header';

type OrdersPageProps = {
  locale: AppLocale;
  isAuthenticated: boolean;
};

export default async function OrdersPage({ locale, isAuthenticated }: OrdersPageProps) {
  const t = getCatalogTranslations(locale);
  const direction = getCatalogDirection(locale);


  if (!isAuthenticated) {
    return (
      <main dir={direction} className="mx-auto w-full max-w-[980px] px-4 py-6">
        <section className="rounded-2xl border border-secondary/30 bg-background p-6">
          <h1 className="text-xl font-semibold text-text">{t.ordersPageTitle}</h1>
          <p className="mt-3 text-sm text-text/75">{t.ordersNotAuthenticated}</p>
        </section>
      </main>
    );
  }

  try {
    const ordersList = await getOrdersList(1);

      return <>
            <Header locale={locale}  t={t} hideSearchInput  />
          <OrdersList locale={locale} initialOrdersList={ordersList} />
        </>
  } catch {
    return <ErrorState locale={locale} />;
  }
}
