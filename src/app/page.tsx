import type { Metadata } from 'next';
import HomePage from '../features/home/pages';
import { getHomeTranslations } from '../core/i18n/commonLocale';
import { resolveHomeLocale } from '../features/home/api/homeLocale';

const SITE_URL = 'https://chadisho.com';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveHomeLocale();
  const t = getHomeTranslations(locale);

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `${SITE_URL}/`,
      languages: {
        fa: `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/`,
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${SITE_URL}/`,
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      alternateLocale: locale === 'fa' ? 'en_US' : 'fa_IR',
      type: 'website',
      siteName: 'Chadisho',
      images: [
        {
          url: `${SITE_URL}/favicon.png`,
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: [`${SITE_URL}/favicon.png`],
      site: '@chadisho',
      creator: '@chadisho',
    },
  };
}

export default function Page() {
  return <HomePage />;
}