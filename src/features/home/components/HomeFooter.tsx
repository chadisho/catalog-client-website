import { Globe, Mail, MessageCircle, Phone, Send, Share2, Smartphone } from 'lucide-react';
import type { HomeTranslations } from '../../../core/i18n/commonLocale';
import type { AppLocale } from '../../../core/i18n/globalLocale';

const PHONE = '021-91090093';
const PHONE_TEL = 'tel:02191090093';
const CELLPHONE = '+98 935 210 1030';
const CELLPHONE_HREF = 'tel:+989352101030';
const EMAIL = 'softbaran@gmail.com';
const EMAIL_HREF = 'mailto:softbaran@gmail.com';
const WHATSAPP = 'https://wa.me/+989352101030';

interface HomeFooterProps {
  t: HomeTranslations;
  locale?: AppLocale;
}

export default function HomeFooter({ t, locale = 'fa' }: HomeFooterProps) {
  const getLocalePrefix = () => (locale === 'en' ? '/en' : '');
  const getPrivacyLink = () => `${getLocalePrefix()}/privacy-policy`;
  const getTermsLink = () => `${getLocalePrefix()}/terms-and-conditions`;
  const socialLinks = [
    { icon: Share2, href: '#', label: 'Twitter' },
    { icon: MessageCircle, href: '#', label: 'Telegram' },
    { icon: Send, href: WHATSAPP, label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Three column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Brand, Description, Contact, Socials */}
          <div>
            {/* Brand */}
            <a href="/" className="inline-flex items-center gap-2 mb-4">
              <img
                src="/assets/chadi-logo.png"
                alt={t.brand.combined}
                className="h-9 w-9 rounded-xl object-contain"
              />
              <span className="text-xl font-bold text-neutral-content">
                {t.brand.fa !== t.brand.en ? (
                  <>
                    {t.brand.fa}
                    <span className="text-primary">{t.brand.en}</span>
                  </>
                ) : (
                  <>
                    {t.brand.combined.slice(0, -2)}
                    <span className="text-primary">{t.brand.combined.slice(-2)}</span>
                  </>
                )}
              </span>
            </a>

            {/* Description */}
            <p className="text-sm leading-relaxed text-neutral-content/60 mb-6">
              {t.footer.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {/* Phone */}
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 text-sm text-neutral-content/70 hover:text-primary transition-colors"
                aria-label={t.footer.phoneLabel}
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span dir="ltr">{PHONE}</span>
              </a>

              {/* Mobile (WhatsApp) */}
              <a
                href={CELLPHONE_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neutral-content/70 hover:text-primary transition-colors"
                aria-label={t.footer.mobileLabel}
              >
                <Smartphone className="w-4 h-4 shrink-0" />
                <span dir="ltr">{CELLPHONE}</span>
              </a>

              {/* Email */}
              <a
                href={EMAIL_HREF}
                className="inline-flex items-center gap-2 text-sm text-neutral-content/70 hover:text-primary transition-colors"
                aria-label={t.footer.emailLabel}
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span dir="ltr">{EMAIL}</span>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 rounded-lg bg-neutral-content/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Middle Column: Useful Links + Copyright */}
          <div className="flex flex-col">
            <h3 className="text-m font-bold text-neutral-content mb-4">
              {t.footer.usefulLinks}
            </h3>
            <nav className="space-y-3 mb-auto flex flex-col pt-2">
              <a
                href={getPrivacyLink()}
                className="inline-block text-sm text-neutral-content/50 hover:text-primary transition-colors"
              >
                {t.footer.privacyLink}
              </a>
              <a
                href={getTermsLink()}
                className="inline-block text-sm text-neutral-content/70 hover:text-primary transition-colors"
              >
                {t.footer.termsLink}
              </a>
              <a
                href="#"
                className="inline-block text-sm text-neutral-content/70 hover:text-primary transition-colors"
              >
                {t.footer.educationLink}
              </a>
            </nav>
     
          </div>

          {/* Right Column: e-nemad Placeholder */}
          <div className="flex items-start justify-center md:justify-end">
            <div className="w-24 h-24 bg-neutral-content/10 rounded-lg flex items-center justify-center">
              <span className="text-xs text-neutral-content/40 text-center px-2">
                {/*e-nemad*/}
              </span>
            </div>
          </div>
              </div>
                     <p className="text-xs text-neutral-content/50 mt-8 pt-6 border-t border-neutral-content/10 text-center">
              {t.footer.copyright}
            </p>
      </div>
    </footer>
  );
}
