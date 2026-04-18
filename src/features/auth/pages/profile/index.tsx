import { getCatalogDirection, getCatalogTranslations } from '../../../../core/i18n/catalogLocale';
import type { AppLocale } from '../../../../core/i18n/globalLocale';
import ErrorState from '../../../../core/components/feedback/ErrorState';
import { getProfile } from '../../api/profileApi';
import Link from 'next/link';

type ProfilePageProps = {
  locale: AppLocale;
  isAuthenticated: boolean;
};

function resolveGenderLabel(
  gender: number | null,
  t: ReturnType<typeof getCatalogTranslations>,
): string {
  if (gender === 0) {
    return t.profileGenderMale;
  }

  if (gender === 1) {
    return t.profileGenderFemale;
  }

  return t.profileGenderUnknown;
}

export default async function ProfilePage({ locale, isAuthenticated }: ProfilePageProps) {
  const t = getCatalogTranslations(locale);
  const direction = getCatalogDirection(locale);

  if (!isAuthenticated) {
    return (
      <main dir={direction} className="mx-auto w-full max-w-[900px] px-4 py-6">
        <section className="rounded-2xl border border-secondary/30 bg-background p-6">
          <h1 className="text-xl font-semibold text-text">{t.profilePageTitle}</h1>
          <p className="mt-3 text-sm text-text/75">{t.profileNotAuthenticated}</p>
        </section>
      </main>
    );
  }

  try {
    const profile = await getProfile();
    const genderLabel = resolveGenderLabel(profile.gender, t);

    return (
      <main dir={direction} className="mx-auto w-full max-w-[900px] px-4 py-6">
        <section className="rounded-2xl border border-secondary/30 bg-background p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-semibold text-text">{t.profilePageTitle}</h1>

            <Link
              href="/profile/edit"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-primary px-4 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              {t.profileEdit}
            </Link>
          </div>

          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-text/65">{t.profileFirstName}</label>
              <input
                value={profile.firstName}
                readOnly
                className="h-11 w-full rounded-lg border border-secondary/30 bg-surface px-3 text-text"
              />
            </div>
            <div>
              <label className="mb-2 block text-text/65">{t.profileLastName}</label>
              <input
                value={profile.lastName}
                readOnly
                className="h-11 w-full rounded-lg border border-secondary/30 bg-surface px-3 text-text"
              />
            </div>
            <div>
              <label className="mb-2 block text-text/65">{t.profileCellphone}</label>
              <input
                value={profile.cellphone}
                readOnly
                className="h-11 w-full rounded-lg border border-secondary/30 bg-surface px-3 text-text"
              />
            </div>
            <div>
              <label className="mb-2 block text-text/65">{t.profileGender}</label>
              <input
                value={genderLabel}
                readOnly
                className="h-11 w-full rounded-lg border border-secondary/30 bg-surface px-3 text-text"
              />
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
  } catch {
    return <ErrorState locale={locale} />;
  }
}
