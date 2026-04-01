import type { ShopInformation } from '../api/shopApi';
import ErrorState from '../../../core/components/feedback/ErrorState';
import LoadingState from '../../../core/components/feedback/LoadingState';

interface ShopPageProps {
  shopUsername: string;
  data?: ShopInformation;
  error?: string;
}

export default function ShopPage({ shopUsername, data, error }: ShopPageProps) {
  if (!shopUsername) {
    return <ErrorState />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!data) {
    return <LoadingState />;
  }

  return (
    <div>
      <h1>Shop Profile</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}