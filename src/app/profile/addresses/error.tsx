'use client';

import ErrorState from '../../../core/components/feedback/ErrorState';

type AddressesErrorPageProps = {
  reset: () => void;
};

export default function Error({ reset }: AddressesErrorPageProps) {
  return <ErrorState onRetry={reset} />;
}
