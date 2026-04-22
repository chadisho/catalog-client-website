import type { Metadata } from 'next';
import HomePage from '../features/home/pages';
import { getHomeTranslations } from '../core/i18n/commonLocale';
import { resolveHomeLocale } from '../features/home/api/homeLocale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveHomeLocale();
  const t = getHomeTranslations(locale);

  return {
    title: t.meta.title,
    description: t.meta.description,
  };
}

export default function Page() {
  return <HomePage />;
}