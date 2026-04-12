import { getCatalogTranslations } from '../../../../core/i18n/catalogLocale';
import type { AppLocale } from '../../../../core/i18n/globalLocale';
import ErrorState from '../../../../core/components/feedback/ErrorState';
import { getProfile } from '../../api/profileApi';
import Link from 'next/link';

type ProfilePageProps = {
  locale: AppLocale;
  isAuthenticated: boolean;
};

export default async function ProfilePage({ locale, isAuthenticated }: ProfilePageProps) {
  const t = getCatalogTranslations(locale);

  if (!isAuthenticated) {
    return (
      <main className="mx-auto w-full max-w-[900px] px-4 py-6">
        <section className="rounded-2xl border border-secondary/30 bg-background p-6">
          <h1 className="text-xl font-semibold text-text">{t.profilePageTitle}</h1>
          <p className="mt-3 text-sm text-text/75">{t.profileNotAuthenticated}</p>
        </section>
      </main>
    );
  }

  try {
    const profile = await getProfile();

    return (
      <main className="mx-auto w-full max-w-[900px] px-4 py-6">
        <section className="rounded-2xl border border-secondary/30 bg-background p-6">
          <h1 className="text-xl font-semibold text-text">{t.profilePageTitle}</h1>

          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg border border-secondary/30 p-3">
              <p className="text-text/65">{t.profileFirstName}</p>
              <p className="mt-1 font-medium text-text">{profile.firstName || '-'}</p>
            </div>
            <div className="rounded-lg border border-secondary/30 p-3">
              <p className="text-text/65">{t.profileLastName}</p>
              <p className="mt-1 font-medium text-text">{profile.lastName || '-'}</p>
            </div>
            <div className="rounded-lg border border-secondary/30 p-3">
              <p className="text-text/65">{t.profileCellphone}</p>
              <p className="mt-1 font-medium text-text">{profile.cellphone || '-'}</p>
            </div>
            <div className="rounded-lg border border-secondary/30 p-3">
              <p className="text-text/65">{t.profileCompany}</p>
              <p className="mt-1 font-medium text-text">{profile.companyName || '-'}</p>
            </div>
          </div>

          <Link
            href="/profile/orders"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg border border-primary px-4 text-sm font-medium text-primary transition hover:bg-primary/10"
          >
            {t.profileViewOrders}
          </Link>
        </section>
      </main>
    );
  } catch (e) {
      console.log("EERR");
      console.log(e);
    return <ErrorState locale={locale} />;
  }
}
