import type { ProductDetailsModel } from '../api/productApi';
import ErrorState from '../../../core/components/feedback/ErrorState';
import LoadingState from '../../../core/components/feedback/LoadingState';

interface ProductPageProps {
  productCode: string;
  data?: ProductDetailsModel;
  error?: string;
}

export default function ProductPage({ productCode, data, error }: ProductPageProps) {
  if (!productCode) {
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
      <h1>Product Details</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}