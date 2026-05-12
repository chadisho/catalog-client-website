import { BookOpen, Globe, MessageCircle, Send, Share2 } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';

interface HomeFooterProps {
  t: HomeTranslations;
}

export default function HomeFooter({ t }: HomeFooterProps) {
  const productLinks = ['Features', 'Pricing', 'Templates', 'Integrations', 'Changelog'];
  const resourceLinks = ['Help Center', 'Blog', 'Tutorials', 'API Docs', 'Community'];
  const companyLinks = ['About', 'Careers', 'Privacy Policy', 'Terms of Service', 'Contact'];

  const socialLinks = [
    { icon: Share2, href: '#', label: 'Twitter' },
    { icon: MessageCircle, href: '#', label: 'Telegram' },
    { icon: Send, href: '#', label: 'WhatsApp' },
    { icon: Globe, href: '#', label: 'Website' },
  ];

  return (
    <footer className="bg-neutral text-neutral-content pt-16 pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary">
                <BookOpen className="w-5 h-5 text-primary-content" />
              </div>
              <span className="text-xl font-bold text-neutral-content">
                {t.brand.fa !== t.brand.en ? t.brand.fa : t.brand.combined.slice(0, -2)}
                <span className="text-primary">{t.brand.fa !== t.brand.en ? t.brand.en : t.brand.combined.slice(-2)}</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed text-neutral-content/60">{t.footer.description}</p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-neutral-content/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-content mb-4">{t.footer.productColumn}</h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-neutral-content/60 hover:text-neutral-content transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-content mb-4">{t.footer.resourcesColumn}</h4>
            <ul className="space-y-2.5 text-sm">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-neutral-content/60 hover:text-neutral-content transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-content mb-4">{t.footer.companyColumn}</h4>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-neutral-content/60 hover:text-neutral-content transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-content/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-content/60">{t.footer.copyright}</p>
          <div className="flex items-center gap-2 text-sm text-neutral-content/60">
            <span className="w-2 h-2 bg-success rounded-full pulse-dot" />
            {t.footer.systemsOk}
          </div>
        </div>
      </div>
    </footer>
  );
}
