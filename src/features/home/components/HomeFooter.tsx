import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeFooterProps {
  t: HomeTranslations;
}

export default function HomeFooter({ t }: HomeFooterProps) {
  return (
    <footer className="bg-surface py-10">
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-text/80">{t.footer.description}</p>
        <p className="mt-2 text-xs text-text/60">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
