import CatalogCard from './CatalogCard';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import type { AnySectionModel } from '../model/sectionModel';
import type { CatalogLocale } from '../../../core/i18n/catalogLocale';

type CatalogSectionProps = {
  section: AnySectionModel;
  locale: CatalogLocale;
};

export default function CatalogSection({ section, locale }: CatalogSectionProps) {
  return (
    <section>
      <SectionTitle title={section.title} />

      {section.sectionable_type === 'product' ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {section.values.map((item, index) => (
            <ProductCard key={`product-${item.id ?? index}`} product={item} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {section.values.map((item, index) => (
            <CatalogCard key={`catalog-${item.id ?? index}`} catalog={item} />
          ))}
        </div>
      )}
    </section>
  );
}
