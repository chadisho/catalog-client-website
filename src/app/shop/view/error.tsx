'use client';

import ErrorState from '../../../core/components/feedback/ErrorState';

interface ShopErrorPageProps {
  reset: () => void;
}

export default function Error({ reset }: ShopErrorPageProps) {
  return <ErrorState onRetry={reset} />;
}
