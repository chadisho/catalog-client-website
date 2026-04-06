import { headers } from 'next/headers';
import { getHomeTranslations, resolveCommonLocale } from '../../../core/i18n/commonLocale';

async function resolveHomeLocale() {
  const requestHeaders = await headers();
  return resolveCommonLocale(requestHeaders.get('accept-language'));
}

export default async function HomePage() {
  const locale = await resolveHomeLocale();
  const t = getHomeTranslations(locale);

  return <div>{t.title}</div>;
}