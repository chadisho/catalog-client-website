"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../core/theme/useTheme';
import { LOCALE_COOKIE_KEY, type AppLocale } from '../../../core/i18n/globalLocale';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';
import chadiLogo from '../../../assets/chadi-logo.png';

interface HomeNavbarProps {
  locale: AppLocale;
  t: HomeTranslations;
}

export default function HomeNavbar({ locale, t }: HomeNavbarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const nextLocale = locale === 'fa' ? 'en' : 'fa';
  const currentThemeLabel = useMemo(() => {
    if (theme === 'dark') {
      return t.nav.themeDark;
    }

    if (theme === 'light') {
      return t.nav.themeLight;
    }

    return t.nav.themeSystem;
  }, [theme, t.nav.themeDark, t.nav.themeLight, t.nav.themeSystem]);

  const CurrentThemeIcon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon;

  const handleLanguageToggle = () => {
    document.cookie = `${LOCALE_COOKIE_KEY}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src={chadiLogo} alt={t.brand.combined} className="h-9 w-9 rounded-lg object-contain" priority />
          <span className="text-base font-bold text-text sm:text-lg">{t.brand.combined}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-text/80 transition hover:text-primary">
            {t.nav.features}
          </a>
          <a href="#how-it-works" className="text-sm text-text/80 transition hover:text-primary">
            {t.nav.howItWorks}
          </a>
          <a href="#download" className="text-sm text-text/80 transition hover:text-primary">
            {t.nav.download}
          </a>
          <a href="#faq" className="text-sm text-text/80 transition hover:text-primary">
            {t.nav.faq}
          </a>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs text-text transition hover:bg-muted"
            aria-label={t.nav.theme}
            title={t.nav.theme}
          >
            <CurrentThemeIcon size={14} />
            <span>{currentThemeLabel}</span>
          </button>
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="inline-flex h-10 items-center rounded-full border border-border bg-surface px-3 text-xs font-medium text-text transition hover:bg-muted"
            aria-label={t.nav.language}
            title={t.nav.language}
          >
            {nextLocale === 'fa' ? t.nav.languageFa : t.nav.languageEn}
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-sm text-text" onClick={() => setIsMobileMenuOpen(false)}>
              {t.nav.features}
            </a>
            <a href="#how-it-works" className="text-sm text-text" onClick={() => setIsMobileMenuOpen(false)}>
              {t.nav.howItWorks}
            </a>
            <a href="#download" className="text-sm text-text" onClick={() => setIsMobileMenuOpen(false)}>
              {t.nav.download}
            </a>
            <a href="#faq" className="text-sm text-text" onClick={() => setIsMobileMenuOpen(false)}>
              {t.nav.faq}
            </a>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-3 text-xs text-text"
              >
                <CurrentThemeIcon size={14} />
                <span>{currentThemeLabel}</span>
              </button>
              <button
                type="button"
                onClick={handleLanguageToggle}
                className="inline-flex h-10 items-center rounded-full border border-border bg-background px-3 text-xs text-text"
              >
                {nextLocale === 'fa' ? t.nav.languageFa : t.nav.languageEn}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
