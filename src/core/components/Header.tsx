"use client";

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Languages, Menu, Palette, Search, ShoppingCart, UserRound, X } from 'lucide-react';
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
  openMenu: string;
  closeMenu: string;
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
  headerTitle?: string;
  headerImage?: string;
  shopSlug?: string;
}

export default function Header({
  locale,
  t,
  hideSearchInput = false,
  headerTitle,
  headerImage,
  shopSlug,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [loadedHeaderImageSrc, setLoadedHeaderImageSrc] = useState<string | null>(null);
  const [failedHeaderImageSrc, setFailedHeaderImageSrc] = useState<string | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const drawerToggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerCloseButtonRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (!isMobileDrawerOpen) {
      return;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isMobileDrawerOpen]);

  useEffect(() => {
    if (isMobileDrawerOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      drawerCloseButtonRef.current?.focus();

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    drawerToggleButtonRef.current?.focus();
    return undefined;
  }, [isMobileDrawerOpen]);

  const handleLocaleChange = (nextLocale: CatalogLocale) => {
    setIsMobileDrawerOpen(false);
    document.cookie = `${LOCALE_COOKIE_KEY}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    await queryClient.invalidateQueries({ queryKey: ['auth-session'] });
    router.refresh();
  };

  const brandTitle = headerTitle?.trim() || t.brand;
  const shouldRenderHeaderImage = Boolean(headerImage) && headerImage !== failedHeaderImageSrc;
  const isHeaderImageLoaded = Boolean(headerImage) && loadedHeaderImageSrc === headerImage;
  const normalizedShopSlug = shopSlug?.trim();
  const drawerHiddenTranslateClass = locale === 'fa' ? 'translate-x-full' : '-translate-x-full';

  const handleBrandClick = () => {
    if (!normalizedShopSlug) {
      return;
    }

    router.push(`/shop/${encodeURIComponent(normalizedShopSlug)}`);
  };

  return (
    <header className="border-b border-border bg-background px-4 py-4 text-text">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-2 md:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex ps-1 sm:ps-3">
            <button
              type="button"
              onClick={handleBrandClick}
              disabled={!normalizedShopSlug}
              className="flex items-center gap-2 disabled:cursor-default"
            >
              <div className="relative h-8 w-8">
                <Image
                  src={chadiLogo}
                  alt={brandTitle}
                  className="h-8 w-8 rounded-md object-contain"
                  priority
                />
                {shouldRenderHeaderImage ? (
                  <img
                    src={headerImage as string}
                    alt={brandTitle}
                    className={`absolute inset-0 rounded-md object-contain transition-opacity ${
                      isHeaderImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => {
                      setLoadedHeaderImageSrc(headerImage ?? null);
                      setFailedHeaderImageSrc((prev) => (prev === headerImage ? null : prev));
                    }}
                    onError={() => {
                      setFailedHeaderImageSrc(headerImage ?? null);
                      setLoadedHeaderImageSrc((prev) => (prev === headerImage ? null : prev));
                    }}
                  />
                ) : null}
              </div>
              <span className="text-lg font-semibold md:text-2xl">{brandTitle}</span>
            </button>
          </div>

          {!hideSearchInput ? (
            <div className="relative hidden flex-1 md:block">
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

        <button
          ref={drawerToggleButtonRef}
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface md:hidden"
          aria-label={t.openMenu}
          title={t.openMenu}
          aria-controls="catalog-mobile-drawer"
          aria-expanded={isMobileDrawerOpen}
        >
          <Menu size={18} strokeWidth={2} aria-hidden />
        </button>

        <div className="hidden items-center gap-2 md:flex">
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

      {isMobileDrawerOpen ? (
        <>
          <button
            type="button"
            aria-label={t.closeMenu}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          <aside
            id="catalog-mobile-drawer"
            className={`fixed inset-y-0 start-0 z-50 w-72 transform border-e border-border bg-surface p-4 transition-transform duration-200 md:hidden ${
              isMobileDrawerOpen ? 'translate-x-0' : drawerHiddenTranslateClass
            }`}
            aria-label={t.openMenu}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text">{brandTitle}</span>
              <button
                ref={drawerCloseButtonRef}
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background"
                aria-label={t.closeMenu}
                title={t.closeMenu}
              >
                <X size={18} strokeWidth={2} aria-hidden />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {!hideSearchInput ? (
                <div className="relative">
                  <span
                    className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-text/70"
                    aria-hidden
                  >
                    <Search size={18} strokeWidth={2} />
                  </span>
                  <input
                    type="search"
                    placeholder={t.searchPlaceholder}
                    className="h-12 w-full appearance-none rounded-full border border-border bg-background px-11 text-sm text-text outline-none ring-primary transition placeholder:text-text/70 focus:ring-2"
                  />
                </div>
              ) : null}

              <div className="flex items-center gap-2 text-sm font-medium text-text">
                <Palette size={16} strokeWidth={2} aria-hidden />
                <span>{t.theme}</span>
              </div>
              <label className="sr-only" htmlFor="catalog-theme-select-mobile">
                {t.theme}
              </label>
              <select
                id="catalog-theme-select-mobile"
                value={theme}
                onChange={(event) => setTheme(event.target.value as 'light' | 'dark' | 'system')}
                className="h-10 w-full appearance-none rounded-full border border-border bg-background px-3 text-xs text-text outline-none"
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

              <div className="flex items-center gap-2 text-sm font-medium text-text">
                <Languages size={16} strokeWidth={2} aria-hidden />
                <span>{t.language}</span>
              </div>
              <label className="sr-only" htmlFor="catalog-language-select-mobile">
                {t.language}
              </label>
              <select
                id="catalog-language-select-mobile"
                value={locale}
                onChange={(event) => handleLocaleChange(event.target.value as CatalogLocale)}
                className="h-10 w-full appearance-none rounded-full border border-border bg-background px-3 text-xs text-text outline-none"
              >
                <option className="text-text" value="fa">
                  {t.languageFa}
                </option>
                <option className="text-text" value="en">
                  {t.languageEn}
                </option>
              </select>

              {isAuthenticated ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileDrawerOpen(false);
                      router.push('/profile');
                    }}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-primary px-4 text-sm font-medium text-primary transition hover:bg-primary/10"
                  >
                    <UserRound size={18} strokeWidth={2} aria-hidden />
                    <span>{t.profile}</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setIsMobileDrawerOpen(false);
                      await handleLogout();
                    }}
                    className="inline-flex h-11 w-full items-center justify-center rounded-full border border-danger px-4 text-sm font-medium text-danger transition hover:bg-danger/10"
                  >
                    {t.logout}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    setIsLoginSheetOpen(true);
                  }}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-primary px-4 text-sm font-medium text-primary transition hover:bg-primary/10"
                >
                  <UserRound size={18} strokeWidth={2} aria-hidden />
                  <span>{t.login}</span>
                </button>
              )}
            </div>
          </aside>
        </>
      ) : null}

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