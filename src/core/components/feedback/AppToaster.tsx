"use client";

import { useEffect, useMemo, useState } from 'react';
import 'sonner/dist/styles.css';
import { Toaster } from 'sonner';
import { useTheme } from '../../theme/useTheme';

type Direction = 'rtl' | 'ltr';

export default function AppToaster() {
  const { resolvedTheme } = useTheme();
  const [dir, setDir] = useState<Direction>('ltr');

  useEffect(() => {
    const nextDir = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
    setDir(nextDir);
  }, []);

  const position = useMemo(() => (dir === 'rtl' ? 'top-left' : 'top-right'), [dir]);

  return (
    <Toaster
      dir={dir}
      position={position}
      theme={resolvedTheme}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            'font-[var(--sans)] border border-border bg-surface text-text shadow-lg data-[type=success]:border-success/35 data-[type=success]:bg-success/10 data-[type=error]:border-danger/35 data-[type=error]:bg-danger/10',
          title: 'font-[var(--sans)] text-text',
          description: 'font-[var(--sans)] text-text/80',
          closeButton: 'bg-surface text-text border-border',
        },
      }}
    />
  );
}
