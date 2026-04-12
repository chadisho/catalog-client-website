import { cookies } from 'next/headers';
import { AUTH_TOKEN_COOKIE_KEY } from '../../../../core/constants/auth';
import { LOCALE_COOKIE_KEY, resolveAppLocale } from '../../../../core/i18n/globalLocale';
import OrderShowPage from '../../../../features/auth/pages/orders/show';

type OrderShowRouteParams = {
  orderId: string;
};

type OrderShowRoutePageProps = {
  params: Promise<OrderShowRouteParams>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({ params }: OrderShowRoutePageProps) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const locale = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? 'en';
  const isAuthenticated = Boolean(cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value);
  const orderId = Number(resolvedParams.orderId);

  return <OrderShowPage locale={locale} isAuthenticated={isAuthenticated} orderId={orderId} />;
}
