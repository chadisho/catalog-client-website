import type { ShopInformation } from '../api/shopApi';
import ErrorState from '../../../core/components/feedback/ErrorState';
import LoadingState from '../../../core/components/feedback/LoadingState';
import {
  getShopTranslations,
  resolveCommonLocale,
  type CommonLocale,
} from '../../../core/i18n/commonLocale';

interface ShopPageProps {
  shopUsername: string;
  data?: ShopInformation;
  error?: string;
}

function resolveShopLocale(data?: ShopInformation): CommonLocale {
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

  if (!shopUsername) {
    return <ErrorState locale={locale} />;
  }

  if (error) {
    return <ErrorState locale={locale} />;
  }

  if (!data) {
    return <LoadingState locale={locale} />;
  }

  return (
    <div>
      <h1>{t.profileTitle}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}