"use client";

import { useTheme } from '../../../core/theme/useTheme';

export default function ThemeToggleButton() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary transition hover:bg-primary/10"
    >
      {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
