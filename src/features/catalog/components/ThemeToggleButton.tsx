"use client";

import { useMemo } from 'react';
import { useTheme } from '../../../core/theme/useTheme';
import { getThemeTranslations, resolveCommonLocale } from '../../../core/i18n/commonLocale';

export default function ThemeToggleButton() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const locale = useMemo(() => {
    if (typeof document === 'undefined') {
      return 'en';
    }

    const htmlLanguage = document.documentElement.lang;
    return resolveCommonLocale(htmlLanguage || navigator.language);
  }, []);
  const t = getThemeTranslations(locale);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary transition hover:bg-primary/10"
    >
      {resolvedTheme === 'dark' ? t.light : t.dark}
    </button>
  );
}
