'use client';

import ErrorState from '../../../../core/components/feedback/ErrorState';

interface CatalogErrorPageProps {
  reset: () => void;
}

export default function Error({ reset }: CatalogErrorPageProps) {
  return <ErrorState onRetry={reset} />;
}
