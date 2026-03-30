import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from '../core/providers';
import '../index.css';

export const metadata: Metadata = {
  title: 'Chadisho Catalog',
  description: 'Catalog, product and shop pages',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}