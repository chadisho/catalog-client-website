"use client";

import Link from 'next/link';
import { BookOpen, Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../core/theme/useTheme';
import { LOCALE_COOKIE_KEY, type AppLocale } from '../../../core/i18n/globalLocale';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeNavbarProps {
  locale: AppLocale;
  t: HomeTranslations;
}

export default function HomeNavbar({ locale, t }: HomeNavbarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const nextLocale = locale === 'fa' ? 'en' : 'fa';
  const currentThemeLabel = useMemo(() => {
    if (theme === 'dark') return t.nav.themeDark;
    if (theme === 'light') return t.nav.themeLight;
    return t.nav.themeSystem;
  }, [theme, t.nav.themeDark, t.nav.themeLight, t.nav.themeSystem]);

  const CurrentThemeIcon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLanguageToggle = () => {
    document.cookie = `${LOCALE_COOKIE_KEY}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return (
    <header
      className={`fixed start-0 end-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface/90 nav-blur shadow-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
         
          <img src="/assets/chadi-logo.png" alt={t.brand.combined} className="h-9 w-9 rounded-lg object-contain" />
          <span className="text-xl font-bold text-text">
            {t.brand.fa !== t.brand.en ? (
              <>{t.brand.fa}<span className="text-primary">{t.brand.en}</span></>
            ) : (
              <>{t.brand.combined.slice(0, -2)}<span className="text-primary">{t.brand.combined.slice(-2)}</span></>
            )}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-text/70 hover:text-primary transition-colors">
            {t.nav.features}
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-text/70 hover:text-primary transition-colors">
            {t.nav.howItWorks}
                  </a>
                  {/*//todo add real pricing section*/}
          {/*<a href="#pricing" className="text-sm font-medium text-text/70 hover:text-primary transition-colors">
            {t.nav.faq}
          </a>*/}
          <a href="#faq" className="text-sm font-medium text-text/70 hover:text-primary transition-colors">
            {t.nav.faq}
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs text-text transition hover:bg-muted"
            aria-label={t.nav.theme}
          >
            <CurrentThemeIcon size={14} />
          </button>
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3 text-xs font-medium text-text transition hover:bg-muted"
            aria-label={t.nav.language}
          >
            {nextLocale === 'fa' ? t.nav.languageFa : t.nav.languageEn}
          </button>
          <a
            href="#download"
            className="btn-shine inline-flex h-9 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-content shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            {t.hero.primaryCta}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted transition-colors md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          {isMobileMenuOpen ? <X size={18} className="text-text" /> : <Menu size={18} className="text-text" />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="mobile-menu-open bg-surface/95 nav-blur border-t border-border md:hidden">
          <div className="px-4 py-4 space-y-1">
            {[
              { href: '#features', label: t.nav.features },
              { href: '#how-it-works', label: t.nav.howItWorks },
              { href: '#pricing', label: t.nav.faq },
              { href: '#faq', label: t.nav.faq },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-text hover:bg-muted hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-3 text-xs text-text"
                >
                  <CurrentThemeIcon size={14} />
                  <span>{currentThemeLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={handleLanguageToggle}
                  className="inline-flex h-9 items-center rounded-full border border-border bg-background px-3 text-xs text-text"
                >
                  {nextLocale === 'fa' ? t.nav.languageFa : t.nav.languageEn}
                </button>
              </div>
              <a
                href="#download"
                className="block text-center text-sm font-semibold text-primary-content bg-primary px-5 py-2.5 rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.hero.primaryCta}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
