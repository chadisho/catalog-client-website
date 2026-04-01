'use client';

import ErrorState from '../../../../core/components/feedback/ErrorState';

interface ProductErrorPageProps {
  reset: () => void;
}

export default function Error({ reset }: ProductErrorPageProps) {
  return <ErrorState onRetry={reset} />;
}
