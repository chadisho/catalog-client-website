"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';
import AppToaster from './components/feedback/AppToaster';
import ChunkLoadRecovery from './components/ChunkLoadRecovery';
import { ThemeProvider } from './theme/ThemeProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ChunkLoadRecovery />
        {children}
        <AppToaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}