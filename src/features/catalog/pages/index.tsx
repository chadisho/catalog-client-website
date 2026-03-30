import type { CatalogDetailsModel } from '../api/catalogApi';

interface CatalogPageProps {
  catalogCode: string;
  data?: CatalogDetailsModel;
  error?: string;
}

export default function CatalogPage({ catalogCode, data, error }: CatalogPageProps) {
  if (!catalogCode) {
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
      <h1>Catalog Details</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}