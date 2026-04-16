'use client';

import ErrorState from '../../../core/components/feedback/ErrorState';

type OrdersErrorPageProps = {
  reset: () => void;
};

export default function Error({ reset }: OrdersErrorPageProps) {
  return <ErrorState onRetry={reset} />;
}
