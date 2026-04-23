"use client";

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Languages,
  Menu,
  Monitor,
  Moon,
  Palette,
  Search,
  ShoppingCart,
  Sun,
  UserRound,
  X,
} from 'lucide-react';
import { useTheme } from '../theme/useTheme';
import type { CatalogLocale } from '../i18n/catalogLocale';
import { LOCALE_COOKIE_KEY } from '../i18n/globalLocale';
import { getAuthSession, logout } from '../../features/auth/api/authClientApi';
import LoginSheet from '../../features/auth/components/LoginSheet';
import { useCartStore } from '../../features/cart/store/cartStore';

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
  profileOrders: string;
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
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

type ThemeOption = 'light' | 'dark' | 'system';

export default function Header({
  locale,
  t,
  hideSearchInput = false,
  headerTitle,
  headerImage,
  shopSlug,
  searchValue,
  onSearchChange,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileThemeMenuOpen, setIsMobileThemeMenuOpen] = useState(false);
  const [isMobileLanguageMenuOpen, setIsMobileLanguageMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [internalSearchValue, setInternalSearchValue] = useState('');
  const [loadedHeaderImageSrc, setLoadedHeaderImageSrc] = useState<string | null>(null);
  const [failedHeaderImageSrc, setFailedHeaderImageSrc] = useState<string | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileThemeMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLanguageMenuRef = useRef<HTMLDivElement | null>(null);
  const drawerToggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const hydrateCartStore = useCartStore((state) => state.hydrate);
  const hasCartHydrated = useCartStore((state) => state.hasHydrated);
  const cart = useCartStore((state) => state.cart);
  const prefetchCartIfNeeded = useCartStore((state) => state.prefetchCartIfNeeded);
  const resetCart = useCartStore((state) => state.resetCart);

  const { data: session } = useQuery({
    queryKey: ['auth-session'],
    queryFn: getAuthSession,
  });

  const isAuthenticated = Boolean(session?.isAuthenticated);
  const cartItemsCount = (cart?.listProducts ?? []).length;

  useEffect(() => {
    hydrateCartStore();
  }, [hydrateCartStore]);

  useEffect(() => {
    if (!hasCartHydrated) {
      return;
    }

    if (!isAuthenticated) {
      resetCart();
      return;
    }

    void prefetchCartIfNeeded();
  }, [hasCartHydrated, isAuthenticated, prefetchCartIfNeeded, resetCart]);

  useEffect(() => {
    if (
      !isProfileMenuOpen &&
      !isThemeMenuOpen &&
      !isLanguageMenuOpen &&
      !isMobileThemeMenuOpen &&
      !isMobileLanguageMenuOpen
    ) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const menuRefs = [
        profileMenuRef.current,
        themeMenuRef.current,
        languageMenuRef.current,
        mobileThemeMenuRef.current,
        mobileLanguageMenuRef.current,
      ];
      const isInsideMenu = menuRefs.some((menuRef) => menuRef?.contains(target));

      if (isInsideMenu) {
        return;
      }

      setIsProfileMenuOpen(false);
      setIsThemeMenuOpen(false);
      setIsLanguageMenuOpen(false);
      setIsMobileThemeMenuOpen(false);
      setIsMobileLanguageMenuOpen(false);
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [
    isProfileMenuOpen,
    isThemeMenuOpen,
    isLanguageMenuOpen,
    isMobileThemeMenuOpen,
    isMobileLanguageMenuOpen,
  ]);

  useEffect(() => {
    if (
      !isMobileDrawerOpen &&
      !isProfileMenuOpen &&
      !isThemeMenuOpen &&
      !isLanguageMenuOpen &&
      !isMobileThemeMenuOpen &&
      !isMobileLanguageMenuOpen
    ) {
      return;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileDrawerOpen(false);
        setIsProfileMenuOpen(false);
        setIsThemeMenuOpen(false);
        setIsLanguageMenuOpen(false);
        setIsMobileThemeMenuOpen(false);
        setIsMobileLanguageMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [
    isMobileDrawerOpen,
    isProfileMenuOpen,
    isThemeMenuOpen,
    isLanguageMenuOpen,
    isMobileThemeMenuOpen,
    isMobileLanguageMenuOpen,
  ]);

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
    resetCart();
    setIsProfileMenuOpen(false);
    await queryClient.invalidateQueries({ queryKey: ['auth-session'] });
    router.refresh();
  };

  const brandTitle = headerTitle?.trim() || t.brand;
  const shouldRenderHeaderImage = Boolean(headerImage) && headerImage !== failedHeaderImageSrc;
  const isHeaderImageLoaded = Boolean(headerImage) && loadedHeaderImageSrc === headerImage;
  const normalizedShopSlug = shopSlug?.trim();
  const drawerHiddenTranslateClass = locale === 'fa' ? 'translate-x-full' : '-translate-x-full';
  const CurrentThemeIcon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon;
  const resolvedSearchValue = searchValue ?? internalSearchValue;

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
      return;
    }

    setInternalSearchValue(value);
  };

  const handleThemeSelect = (nextTheme: ThemeOption) => {
    setTheme(nextTheme);
    setIsThemeMenuOpen(false);
    setIsMobileThemeMenuOpen(false);
  };

  const handleLanguageSelect = (nextLocale: CatalogLocale) => {
    setIsLanguageMenuOpen(false);
    setIsMobileLanguageMenuOpen(false);
    handleLocaleChange(nextLocale);
  };

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
                <img
                  src="/assets/chadi-logo.png"
                  alt={brandTitle}
                  className="h-8 w-8 rounded-md object-contain"
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
                value={resolvedSearchValue}
                onChange={(event) => handleSearchChange(event.target.value)}
                className="h-12 w-full appearance-none rounded-full border border-border bg-surface px-11 text-sm text-text outline-none ring-primary transition placeholder:text-text/70 focus:ring-2"
              />
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => router.push('/cart')}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface"
          aria-label={t.cart}
          title={t.cart}
        >
          <ShoppingCart size={18} strokeWidth={2} aria-hidden />
          {hasCartHydrated && cartItemsCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-content">
              {cartItemsCount}
            </span>
          ) : null}
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
          <div ref={themeMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setIsThemeMenuOpen((prev) => !prev);
                setIsLanguageMenuOpen(false);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:bg-muted"
              aria-label={t.theme}
              title={t.theme}
              aria-haspopup="menu"
              aria-expanded={isThemeMenuOpen}
              aria-controls="catalog-theme-menu"
            >
              <CurrentThemeIcon size={16} strokeWidth={2} aria-hidden />
            </button>

            {isThemeMenuOpen ? (
              <div
                id="catalog-theme-menu"
                role="menu"
                className="absolute end-0 top-[calc(100%+0.5rem)] z-30 rounded-xl border border-border bg-surface p-1.5 shadow-lg"
              >
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleThemeSelect('system')}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted ${
                      theme === 'system' ? 'bg-muted text-primary' : 'text-text'
                    }`}
                    title={t.themeSystem}
                    aria-label={t.themeSystem}
                    role="menuitem"
                  >
                    <Monitor size={16} strokeWidth={2} aria-hidden />
                    <span className="sr-only">{t.themeSystem}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleThemeSelect('light')}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted ${
                      theme === 'light' ? 'bg-muted text-primary' : 'text-text'
                    }`}
                    title={t.themeLight}
                    aria-label={t.themeLight}
                    role="menuitem"
                  >
                    <Sun size={16} strokeWidth={2} aria-hidden />
                    <span className="sr-only">{t.themeLight}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleThemeSelect('dark')}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted ${
                      theme === 'dark' ? 'bg-muted text-primary' : 'text-text'
                    }`}
                    title={t.themeDark}
                    aria-label={t.themeDark}
                    role="menuitem"
                  >
                    <Moon size={16} strokeWidth={2} aria-hidden />
                    <span className="sr-only">{t.themeDark}</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div ref={languageMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setIsLanguageMenuOpen((prev) => !prev);
                setIsThemeMenuOpen(false);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:bg-muted"
              aria-label={t.language}
              title={t.language}
              aria-haspopup="menu"
              aria-expanded={isLanguageMenuOpen}
              aria-controls="catalog-language-menu"
            >
              <Languages size={16} strokeWidth={2} aria-hidden />
            </button>

            {isLanguageMenuOpen ? (
              <div
                id="catalog-language-menu"
                role="menu"
                className="absolute end-0 top-[calc(100%+0.5rem)] z-30 rounded-xl border border-border bg-surface p-1.5 shadow-lg"
              >
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => handleLanguageSelect('fa')}
                    className={`inline-flex h-9 min-w-[72px] items-center justify-center rounded-lg px-2 transition hover:bg-muted ${
                      locale === 'fa' ? 'bg-muted text-primary' : 'text-text'
                    }`}
                    title={t.languageFa}
                    aria-label={t.languageFa}
                    role="menuitem"
                  >
                    <span className="text-xs font-medium">{t.languageFa}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageSelect('en')}
                    className={`inline-flex h-9 min-w-[72px] items-center justify-center rounded-lg px-2 transition hover:bg-muted ${
                      locale === 'en' ? 'bg-muted text-primary' : 'text-text'
                    }`}
                    title={t.languageEn}
                    aria-label={t.languageEn}
                    role="menuitem"
                  >
                    <span className="text-xs font-medium">{t.languageEn}</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>

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
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      router.push('/profile/orders');
                    }}
                    className="w-full rounded-lg px-3 py-2 text-start text-sm text-text transition hover:bg-muted"
                  >
                    {t.profileOrders}
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
                    value={resolvedSearchValue}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    className="h-12 w-full appearance-none rounded-full border border-border bg-background px-11 text-sm text-text outline-none ring-primary transition placeholder:text-text/70 focus:ring-2"
                  />
                </div>
              ) : null}

              <div className="flex items-center gap-2 text-sm font-medium text-text">
                <Palette size={16} strokeWidth={2} aria-hidden />
                <span>{t.theme}</span>
              </div>
              <div ref={mobileThemeMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileThemeMenuOpen((prev) => !prev);
                    setIsMobileLanguageMenuOpen(false);
                  }}
                  className="inline-flex h-10 w-full items-center justify-between rounded-full border border-border bg-background px-3 text-text transition hover:bg-muted"
                  aria-label={t.theme}
                  title={t.theme}
                  aria-haspopup="menu"
                  aria-expanded={isMobileThemeMenuOpen}
                  aria-controls="catalog-theme-menu-mobile"
                >
                  <CurrentThemeIcon size={16} strokeWidth={2} aria-hidden />
                  <ChevronDown size={16} strokeWidth={2} aria-hidden />
                </button>

                {isMobileThemeMenuOpen ? (
                  <div
                    id="catalog-theme-menu-mobile"
                    role="menu"
                    className="absolute start-0 top-[calc(100%+0.5rem)] z-[60] rounded-xl border border-border bg-surface p-1.5 shadow-lg"
                  >
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleThemeSelect('system')}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted ${
                          theme === 'system' ? 'bg-muted text-primary' : 'text-text'
                        }`}
                        title={t.themeSystem}
                        aria-label={t.themeSystem}
                        role="menuitem"
                      >
                        <Monitor size={16} strokeWidth={2} aria-hidden />
                        <span className="sr-only">{t.themeSystem}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleThemeSelect('light')}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted ${
                          theme === 'light' ? 'bg-muted text-primary' : 'text-text'
                        }`}
                        title={t.themeLight}
                        aria-label={t.themeLight}
                        role="menuitem"
                      >
                        <Sun size={16} strokeWidth={2} aria-hidden />
                        <span className="sr-only">{t.themeLight}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleThemeSelect('dark')}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted ${
                          theme === 'dark' ? 'bg-muted text-primary' : 'text-text'
                        }`}
                        title={t.themeDark}
                        aria-label={t.themeDark}
                        role="menuitem"
                      >
                        <Moon size={16} strokeWidth={2} aria-hidden />
                        <span className="sr-only">{t.themeDark}</span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-text">
                <Languages size={16} strokeWidth={2} aria-hidden />
                <span>{t.language}</span>
              </div>
              <div ref={mobileLanguageMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileLanguageMenuOpen((prev) => !prev);
                    setIsMobileThemeMenuOpen(false);
                  }}
                  className="inline-flex h-10 w-full items-center justify-between rounded-full border border-border bg-background px-3 text-text transition hover:bg-muted"
                  aria-label={t.language}
                  title={t.language}
                  aria-haspopup="menu"
                  aria-expanded={isMobileLanguageMenuOpen}
                  aria-controls="catalog-language-menu-mobile"
                >
                  <Languages size={16} strokeWidth={2} aria-hidden />
                  <ChevronDown size={16} strokeWidth={2} aria-hidden />
                </button>

                {isMobileLanguageMenuOpen ? (
                  <div
                    id="catalog-language-menu-mobile"
                    role="menu"
                    className="absolute start-0 top-[calc(100%+0.5rem)] z-[60] rounded-xl border border-border bg-surface p-1.5 shadow-lg"
                  >
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleLanguageSelect('fa')}
                        className={`inline-flex h-9 min-w-[72px] items-center justify-center rounded-lg px-2 transition hover:bg-muted ${
                          locale === 'fa' ? 'bg-muted text-primary' : 'text-text'
                        }`}
                        title={t.languageFa}
                        aria-label={t.languageFa}
                        role="menuitem"
                      >
                        <span className="text-xs font-medium">{t.languageFa}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLanguageSelect('en')}
                        className={`inline-flex h-9 min-w-[72px] items-center justify-center rounded-lg px-2 transition hover:bg-muted ${
                          locale === 'en' ? 'bg-muted text-primary' : 'text-text'
                        }`}
                        title={t.languageEn}
                        aria-label={t.languageEn}
                        role="menuitem"
                      >
                        <span className="text-xs font-medium">{t.languageEn}</span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

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
                    onClick={() => {
                      setIsMobileDrawerOpen(false);
                      router.push('/profile/orders');
                    }}
                    className="inline-flex h-11 w-full items-center justify-center rounded-full border border-primary px-4 text-sm font-medium text-primary transition hover:bg-primary/10"
                  >
                    {t.profileOrders}
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