import { getCatalogDirection, getCatalogTranslations } from '../../../../../core/i18n/catalogLocale';
import type { AppLocale } from '../../../../../core/i18n/globalLocale';
import ErrorState from '../../../../../core/components/feedback/ErrorState';
import { getProfileUpdatePayload } from '../../../api/profileApi';
import ProfileEditForm from '../../../components/ProfileEditForm';

type ProfileEditPageProps = {
  locale: AppLocale;
  isAuthenticated: boolean;
};

export default async function ProfileEditPage({ locale, isAuthenticated }: ProfileEditPageProps) {
  const t = getCatalogTranslations(locale);
  const direction = getCatalogDirection(locale);

  if (!isAuthenticated) {
    return (
      <main dir={direction} className="mx-auto w-full max-w-[900px] px-4 py-6">
        <section className="rounded-2xl border border-secondary/30 bg-background p-6">
          <h1 className="text-xl font-semibold text-text">{t.profileEditPageTitle}</h1>
          <p className="mt-3 text-sm text-text/75">{t.profileNotAuthenticated}</p>
        </section>
      </main>
    );
  }

  try {
    const profilePayload = await getProfileUpdatePayload();

    return (
      <main dir={direction} className="mx-auto w-full max-w-[900px] px-4 py-6">
        <section className="rounded-2xl border border-secondary/30 bg-background p-6">
          <h1 className="text-xl font-semibold text-text">{t.profileEditPageTitle}</h1>

          <ProfileEditForm initialPayload={profilePayload} t={t} />
        </section>
      </main>
    );
  } catch {
    return <ErrorState locale={locale} />;
  }
}
