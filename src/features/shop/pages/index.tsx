import type { ShopInformationModel } from '../model/shopInformationModel';
import ErrorState from '../../../core/components/feedback/ErrorState';
import LoadingState from '../../../core/components/feedback/LoadingState';
import {
  getCommonDirection,
  getShopTranslations,
  resolveCommonLocale,
  type CommonLocale,
} from '../../../core/i18n/commonLocale';
import ShopAboutCard from '../components/ShopAboutCard';
import ShopContactCard from '../components/ShopContactCard';
import ShopProfileHero from '../components/ShopProfileHero';
import Header from '../../../core/components/Header';
import { getCatalogTranslations } from '../../../core/i18n/catalogLocale';

interface ShopPageProps {
  shopUsername: string;
  data?: ShopInformationModel;
  error?: string;
}

function resolveShopLocale(data?: ShopInformationModel): CommonLocale {
  if (!data) {
    return 'en';
  }

  if (typeof data.faName === 'string' && data.faName.trim().length > 0) {
    return 'fa';
  }

  if (typeof data.enName === 'string' && data.enName.trim().length > 0) {
    return 'en';
  }

  return resolveCommonLocale(undefined);
}

export default function ShopPage({ shopUsername, data, error }: ShopPageProps) {
  const locale = resolveShopLocale(data);
    const t = getShopTranslations(locale);
  const headerT = getCatalogTranslations(locale);
  const direction = getCommonDirection(locale);
  const textAlignClass = locale === 'fa' ? 'text-right' : 'text-left';

  if (!shopUsername) {
    return <ErrorState locale={locale} />;
  }

  if (error) {
    return <ErrorState locale={locale} />;
  }

  if (!data) {
    return <LoadingState locale={locale} />;
  }

  const aboutDescription = data.aboutUs?.trim() ?? '';
  const addresses = data.addresses ?? [];

  const socialLinks = [
    { key: 'instagram', label: t.instagram, value: data.instagram },
    { key: 'whatsapp', label: t.whatsapp, value: data.whatsapp },
    { key: 'telegram', label: t.telegram, value: data.telegram },
    { key: 'website', label: t.website, value: data.website },
  ].filter((item) => typeof item.value === 'string' && item.value.trim().length > 0);

    return (
        <>
        
        <Header
                locale={locale} t={headerT} hideSearchInput={true} 
                headerTitle={data?.faName ?? undefined}
              headerImage={data?.avatar ?? undefined}
          
          />
    <main
      dir={direction}
      className={`mx-auto w-full max-w-[1126px] space-y-4 px-4 pb-16 pt-4 ${textAlignClass}`}
      >
        
      <ShopProfileHero
        shopUsername={shopUsername}
        profileTitle={t.profileTitle}
        faName={data.faName}
        enName={data.enName}
        avatar={data.avatar}
        coverImage={data.coverImage}
      />

      <ShopAboutCard
        title={t.aboutTitle}
        description={aboutDescription || t.emptyDescription}
        moreLabel={t.moreDescription}
        lessLabel={t.lessDescription}
      />

      <ShopContactCard
        title={t.contactTitle}
        addressesTitle={t.addressesTitle}
        callLabel={t.call}
        emptyContactsLabel={t.emptyContacts}
        socialLinks={socialLinks.map((item) => ({
          key: item.key,
          label: item.label,
          value: (item.value as string).trim(),
        }))}
        addresses={addresses}
      />
            </main>
            </>
  );
}
