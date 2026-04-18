'use client';

import ErrorState from '../../../core/components/feedback/ErrorState';

type ProfileEditErrorPageProps = {
  reset: () => void;
};

export default function Error({ reset }: ProfileEditErrorPageProps) {
  return <ErrorState onRetry={reset} />;
}
