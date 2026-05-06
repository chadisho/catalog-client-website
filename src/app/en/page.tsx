import type { Metadata } from 'next';
import HomePage from '../../features/home/pages';
import { getHomeTranslations } from '../../core/i18n/commonLocale';

const SITE_URL = 'https://chadisho.com';

export async function generateMetadata(): Promise<Metadata> {
  const t = getHomeTranslations('en');

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `${SITE_URL}/en`,
      languages: {
        fa: `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/`,
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${SITE_URL}/en`,
      locale: 'en_US',
      alternateLocale: 'fa_IR',
      type: 'website',
    },
  };
}

export default function Page() {
  return <HomePage locale="en" />;
}
