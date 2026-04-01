"use client";

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '../../../core/theme/useTheme';
import type { CatalogLocale } from '../../../core/i18n/catalogLocale';
import chadiLogo from '../../../assets/chadi-logo.png';

type CatalogHeaderTranslations = {
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
};

interface CatalogHeaderProps {
  locale: CatalogLocale;
  t: CatalogHeaderTranslations;
}

export default function CatalogHeader({ locale, t }: CatalogHeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLocaleChange = (nextLocale: CatalogLocale) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.set('lang', nextLocale);
    router.replace(`${pathname}?${nextSearchParams.toString()}`);
  };

  return (
    <header className="border-b border-secondary/30 bg-background px-4 py-4 text-text dark:bg-black dark:text-white">
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

          <div className="relative flex-1">
            <span
              className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-text/55 dark:text-white/55"
              aria-hidden
            >
              🔎
            </span>
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              className="h-12 w-full appearance-none rounded-full border border-secondary/40 bg-background/80 px-11 text-sm text-text outline-none ring-primary transition placeholder:text-text/55 focus:ring-2 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/55 dark:[color-scheme:dark]"
            />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-text/20 bg-text/5"
          aria-label={t.cart}
          title={t.cart}
        >
          <span className="text-lg" aria-hidden>
            🛒
          </span>
        </button>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="catalog-theme-select">
            {t.theme}
          </label>
          <select
            id="catalog-theme-select"
            value={theme}
            onChange={(event) => setTheme(event.target.value as 'light' | 'dark' | 'system')}
            className="h-10 appearance-none rounded-full border border-secondary/40 bg-background/80 px-3 text-xs text-text outline-none dark:border-white/15 dark:bg-white/5 dark:text-white dark:[color-scheme:dark]"
          >
            <option className="text-black" value="system">
              {t.themeSystem}
            </option>
            <option className="text-black" value="light">
              {t.themeLight}
            </option>
            <option className="text-black" value="dark">
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
            className="h-10 appearance-none rounded-full border border-secondary/40 bg-background/80 px-3 text-xs text-text outline-none dark:border-white/15 dark:bg-white/5 dark:text-white dark:[color-scheme:dark]"
          >
            <option className="text-black" value="fa">
              {t.languageFa}
            </option>
            <option className="text-black" value="en">
              {t.languageEn}
            </option>
          </select>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary px-4 text-sm font-medium text-primary transition hover:bg-primary/10"
          >
            <span aria-hidden>👤</span>
            <span>{t.login}</span>
          </button>

      
        </div>
      </div>
    </header>
  );
}
