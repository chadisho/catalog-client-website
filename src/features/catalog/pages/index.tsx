import type { CatalogDetailsModel } from '../api/catalogApi';
import CatalogSection from '../components/CatalogSection';
import CatalogHero from '../components/CatalogHero';

interface CatalogPageProps {
  catalogCode: string;
  data?: CatalogDetailsModel;
  error?: string;
}

export default function CatalogPage({ catalogCode, data, error }: CatalogPageProps) {
  if (!catalogCode) {
    return <div className="p-6 text-center text-sm text-rose-500">Error occurred</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-sm text-rose-500">Error occurred</div>;
  }

  if (!data) {
    return <div className="p-6 text-center text-sm text-text/80">Loading...</div>;
  }

  const heroTitle = data.catalogModel?.title ?? 'نام کاتالوگ';
  const heroDescription = data.catalogModel?.description ?? data.shopInformation?.aboutUs ?? '';
  const heroImage = data.catalogModel?.image ?? data.images?.[0]?.image;
  const sections = data.sections ?? [];

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[1fr_320px] lg:gap-8">
        <main className="space-y-10">
          {sections.length === 0 ? (
            <div className="rounded-2xl border border-secondary/30 bg-background/70 p-6 text-center text-sm text-text/70">
              محتوایی برای نمایش وجود ندارد.
            </div>
          ) : (
            sections.map((section) => <CatalogSection key={section.id} section={section} />)
          )}
        </main>

        <CatalogHero title={heroTitle} description={heroDescription} imageUrl={heroImage} />
      </div>
    </div>
  );
}