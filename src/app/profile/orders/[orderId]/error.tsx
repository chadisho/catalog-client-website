'use client';

import ErrorState from '../../../../core/components/feedback/ErrorState';

type OrderDetailsErrorPageProps = {
  reset: () => void;
};

export default function Error({ reset }: OrderDetailsErrorPageProps) {
  return <ErrorState onRetry={reset} />;
}
