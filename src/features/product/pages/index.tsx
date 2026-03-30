import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';

export default function ProductPage() {
  const params = useParams<{ productCode?: string }>();

  const productCode = useMemo(() => {
    const path = window.location.pathname;
    console.log('[ProductPage] URL:', path);

    if (params.productCode) {
      console.log('[ProductPage] URL param productCode:', params.productCode);
      return params.productCode;
    }

    const match = path.match(/\/product\/(\d+)/);
    const code = match?.[1] ?? '';
    console.log('[ProductPage] Parsed productCode:', code);
    return code;
  }, [params.productCode]);

  const { data, isLoading, isError } = useProduct(productCode);

  if (!productCode) {
    return <div>Invalid product code in URL</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  if (!data) {
    return <div>No product data returned</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}