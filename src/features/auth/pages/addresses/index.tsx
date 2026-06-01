import { getAddresses } from '../../api/addressApi';
import AddressList from '../../components/AddressList';
import Header from '../../../../core/components/Header';
import BackToLastContextButton from '../../../navigation/components/BackToLastContextButton';
import { getCatalogDirection } from '../../../../core/i18n/catalogLocale';
import type { CatalogLocale, CatalogTranslations } from '../../../../core/i18n/catalogLocale';

type AddressesPageProps = {
  locale: CatalogLocale;
  isAuthenticated: boolean;
  t: CatalogTranslations;
};

export default async function AddressesPage({ locale, isAuthenticated, t }: AddressesPageProps) {
  const direction = getCatalogDirection(locale);

  if (!isAuthenticated) {
    return (
      <>
        <Header locale={locale} t={t} hideSearchInput />
        <main dir={direction} className="mx-auto w-full max-w-[900px] px-4 py-6">
          <section className="rounded-2xl border border-secondary/30 bg-background p-6">
            <h1 className="text-xl font-semibold text-text">{t.addressesPageTitle}</h1>
            <div className="mt-4">
              <BackToLastContextButton label={t.backToLastContext} />
            </div>
            <p className="mt-3 text-sm text-text/75">{t.addressesNotAuthenticated}</p>
          </section>
        </main>
      </>
    );
  }

  const addresses = await getAddresses();

  return (
    <>
      <Header locale={locale} t={t} hideSearchInput />
      <main dir={direction} className="mx-auto w-full max-w-[980px] px-4 pt-4">
        <BackToLastContextButton label={t.backToLastContext} />
      </main>
      <AddressList initialAddresses={addresses} locale={locale} t={t} />
    </>
  );
}
