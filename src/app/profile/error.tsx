'use client';

import ErrorState from '../../core/components/feedback/ErrorState';

type ProfileErrorPageProps = {
  reset: () => void;
};

export default function Error({ reset }: ProfileErrorPageProps) {
  return <ErrorState onRetry={reset} />;
}
