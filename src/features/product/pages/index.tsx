import type { ProductDetailsModel } from '../api/productApi';

interface ProductPageProps {
  productCode: string;
  data?: ProductDetailsModel;
  error?: string;
}

export default function ProductPage({ productCode, data, error }: ProductPageProps) {
  if (!productCode) {
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
      <h1>Product Details</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}