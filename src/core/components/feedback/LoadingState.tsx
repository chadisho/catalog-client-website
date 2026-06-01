import { cookies } from 'next/headers';
import { getCommonTranslations } from '../../i18n/commonLocale';
import { DEFAULT_APP_LOCALE, LOCALE_COOKIE_KEY, resolveAppLocale } from '../../i18n/globalLocale';

export default async function LoadingState() {
  const cookieStore = await cookies();
  const locale = resolveAppLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value) ?? DEFAULT_APP_LOCALE;
  const t = getCommonTranslations(locale);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-600 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>

        <div className="text-center">
          <p className="text-slate-700 font-medium text-lg tracking-wide">{t.loading}</p>
          <div className="flex gap-1 justify-center mt-2">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
