"use client";

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Search, ShoppingCart, UserRound } from 'lucide-react';
import { useTheme } from '../theme/useTheme';
import type { CatalogLocale } from '../i18n/catalogLocale';
import { LOCALE_COOKIE_KEY } from '../i18n/globalLocale';
import chadiLogo from '../../assets/chadi-logo.png';
import { getAuthSession, logout } from '../../features/auth/api/authClientApi';
import LoginSheet from '../../features/auth/components/LoginSheet';

type HeaderTranslations = {
  searchPlaceholder: string;
  login: string;
  cart: string;
  language: string;
  languageFa: string;
  languageEn: string;
  theme: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
  brand: string;
  profile: string;
  logout: string;
  loginSheetTitle: string;
  loginSheetDescription: string;
  mobileLabel: string;
  mobilePlaceholder: string;
  sendOtp: string;
  otpLabel: string;
  otpPlaceholder: string;
  verifyOtp: string;
  resendOtp: string;
  backToMobile: string;
  close: string;
  authInvalidCellphone: string;
  authInvalidOtp: string;
  authGenericError: string;
};

interface HeaderProps {
  locale: CatalogLocale;
  t: HeaderTranslations;
  hideSearchInput?: boolean;
}

export default function Header({ locale, t, hideSearchInput = false }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const { data: session } = useQuery({
    queryKey: ['auth-session'],
    queryFn: getAuthSession,
  });

  const isAuthenticated = Boolean(session?.isAuthenticated);

  useEffect(() => {
    if (!isProfileMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!profileMenuRef.current) {
        return;
      }

      if (!profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  const handleLocaleChange = (nextLocale: CatalogLocale) => {
    document.cookie = `${LOCALE_COOKIE_KEY}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    await queryClient.invalidateQueries({ queryKey: ['auth-session'] });
    router.refresh();
  };

  return (
    <header className="border-b border-border bg-background px-4 py-4 text-text">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-3 lg:flex-nowrap">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden items-center gap-2 ps-3 sm:flex">
            <Image
              src={chadiLogo}
              alt={t.brand}
              className="h-8 w-8 rounded-md object-contain"
              priority
            />
            <span className="text-2xl font-semibold">{t.brand}</span>
          </div>

          {!hideSearchInput ? (
            <div className="relative flex-1">
              <span
                className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-text/70"
                aria-hidden
              >
                <Search size={18} strokeWidth={2} />
              </span>
              <input
                type="search"
                placeholder={t.searchPlaceholder}
                className="h-12 w-full appearance-none rounded-full border border-border bg-surface px-11 text-sm text-text outline-none ring-primary transition placeholder:text-text/70 focus:ring-2"
              />
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => router.push('/cart')}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface"
          aria-label={t.cart}
          title={t.cart}
        >
          <ShoppingCart size={18} strokeWidth={2} aria-hidden />
        </button>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="catalog-theme-select">
            {t.theme}
          </label>
          <select
            id="catalog-theme-select"
            value={theme}
            onChange={(event) => setTheme(event.target.value as 'light' | 'dark' | 'system')}
            className="h-10 appearance-none rounded-full border border-border bg-surface px-3 text-xs text-text outline-none"
          >
            <option className="text-text" value="system">
              {t.themeSystem}
            </option>
            <option className="text-text" value="light">
              {t.themeLight}
            </option>
            <option className="text-text" value="dark">
              {t.themeDark}
            </option>
          </select>

          <label className="sr-only" htmlFor="catalog-language-select">
            {t.language}
          </label>
          <select
            id="catalog-language-select"
            value={locale}
            onChange={(event) => handleLocaleChange(event.target.value as CatalogLocale)}
            className="h-10 appearance-none rounded-full border border-border bg-surface px-3 text-xs text-text outline-none"
          >
            <option className="text-text" value="fa">
              {t.languageFa}
            </option>
            <option className="text-text" value="en">
              {t.languageEn}
            </option>
          </select>

          {isAuthenticated ? (
            <div ref={profileMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary px-4 text-sm font-medium text-primary transition hover:bg-primary/10"
              >
                <UserRound size={18} strokeWidth={2} aria-hidden />
                <span>{t.profile}</span>
              </button>

              {isProfileMenuOpen ? (
                <div className="absolute end-0 top-[calc(100%+0.5rem)] z-30 min-w-[168px] rounded-xl border border-border bg-surface p-1.5 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      router.push('/profile');
                    }}
                    className="w-full rounded-lg px-3 py-2 text-start text-sm text-text transition hover:bg-muted"
                  >
                    {t.profile}
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2 text-start text-sm text-danger transition hover:bg-danger/10"
                  >
                    {t.logout}
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsLoginSheetOpen(true)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary px-4 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              <UserRound size={18} strokeWidth={2} aria-hidden />
              <span>{t.login}</span>
            </button>
          )}
        </div>
      </div>

      <LoginSheet
        isOpen={isLoginSheetOpen}
        locale={locale}
        t={t}
        onClose={() => setIsLoginSheetOpen(false)}
        onLoginSuccess={async () => {
          await queryClient.invalidateQueries({ queryKey: ['auth-session'] });
          router.refresh();
        }}
      />
    </header>
  );
}