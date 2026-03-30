import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../hooks/useShop';

export default function ShopPage() {
  const params = useParams<{ shopUsername?: string }>();

  const shopUsername = useMemo(() => {
    if (params.shopUsername) return params.shopUsername;
    const match = window.location.pathname.match(/\/shop\/(.+)$/);
    return match?.[1] ?? '';
  }, [params.shopUsername]);

  const { data, isLoading, isError } = useShop(shopUsername);

  if (!shopUsername) {
    return <div>Invalid shop username in URL</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  if (!data) {
    return <div>No shop data returned</div>;
  }

  return (
    <div>
      <h1>Shop Profile</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}