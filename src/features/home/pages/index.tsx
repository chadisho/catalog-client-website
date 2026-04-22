import { getHomeTranslations } from '../../../core/i18n/commonLocale';
import { homeDownloadLinks } from '../../../core/config/homeDownloadLinks';
import HomeDownloadSection from '../components/HomeDownloadSection';
import HomeFaqSection from '../components/HomeFaqSection';
import HomeFeaturesSection from '../components/HomeFeaturesSection';
import HomeFooter from '../components/HomeFooter';
import HomeHeroSection from '../components/HomeHeroSection';
import HomeHowItWorksSection from '../components/HomeHowItWorksSection';
import HomeNavbar from '../components/HomeNavbar';
import { resolveHomeLocale } from '../api/homeLocale';

export default async function HomePage() {
  const locale = await resolveHomeLocale();
  const t = getHomeTranslations(locale);

  return (
    <main className="min-h-screen bg-background text-text">
      <HomeNavbar locale={locale} t={t} />
      <HomeHeroSection t={t} />
      <HomeFeaturesSection t={t} />
      <HomeHowItWorksSection t={t} />
      <HomeDownloadSection t={t} links={homeDownloadLinks} />
      <HomeFaqSection t={t} />
      <HomeFooter t={t} />
    </main>
  );
}