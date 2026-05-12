import type { AppLocale } from '../../../core/i18n/globalLocale';
import { getHomeTranslations } from '../../../core/i18n/commonLocale';
import { homeDownloadLinks } from '../../../core/config/homeDownloadLinks';
import HomeCatalogShowcaseSection from '../components/HomeCatalogShowcaseSection';
import HomeCtaSection from '../components/HomeCtaSection';
import HomeDownloadSection from '../components/HomeDownloadSection';
import HomeFaqSection from '../components/HomeFaqSection';
import HomeFeaturesSection from '../components/HomeFeaturesSection';
import HomeFooter from '../components/HomeFooter';
import HomeHeroSection from '../components/HomeHeroSection';
import HomeHowItWorksSection from '../components/HomeHowItWorksSection';
import HomeNavbar from '../components/HomeNavbar';
import HomePricingSection from '../components/HomePricingSection';
import HomeTestimonialsSection from '../components/HomeTestimonialsSection';
import { resolveHomeLocale } from '../api/homeLocale';

interface HomePageProps {
  locale?: AppLocale;
}

export default async function HomePage({ locale: localeProp }: HomePageProps = {}) {
  const locale = localeProp ?? (await resolveHomeLocale());
  const t = getHomeTranslations(locale);

  return (
    <main className="min-h-screen bg-background text-text overflow-x-hidden">
      <HomeNavbar locale={locale} t={t} />
      <HomeHeroSection t={t} />
      <HomeFeaturesSection t={t} />
      <HomeHowItWorksSection t={t} />
      {/*<HomeCatalogShowcaseSection t={t} />*/}
      <HomeTestimonialsSection t={t} />
      {/*<HomePricingSection t={t} />*/}
      <HomeDownloadSection t={t} links={homeDownloadLinks} />
      <HomeFaqSection t={t} />
      <HomeCtaSection t={t} />
      <HomeFooter t={t} />
    </main>
  );
}
