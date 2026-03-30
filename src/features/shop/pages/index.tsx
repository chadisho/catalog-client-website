import type { ShopInformation } from '../api/shopApi';

interface ShopPageProps {
  shopUsername: string;
  data?: ShopInformation;
  error?: string;
}

export default function ShopPage({ shopUsername, data, error }: ShopPageProps) {
  if (!shopUsername) {
    return <div>Error...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Shop Profile</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}