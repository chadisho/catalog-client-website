import type { Metadata } from 'next';
import type { AppLocale } from '../../../core/i18n/globalLocale';
import { getHomeTranslations } from '../../../core/i18n/commonLocale';
import HomeNavbar from '../../../features/home/components/HomeNavbar';
import HomeFooter from '../../../features/home/components/HomeFooter';

const SITE_URL = 'https://chadisho.com';

export const metadata: Metadata = {
  title: 'Privacy Policy | Chadisho',
  description: 'Privacy Policy of Chadisho',
  alternates: {
    canonical: `${SITE_URL}/en/privacy-policy`,
  },
};

export default function Page() {
  const locale = 'en' as AppLocale;
  const t = getHomeTranslations(locale);

  return (
    <main className="min-h-screen bg-background text-text overflow-x-hidden">
      <HomeNavbar locale={locale} t={t} />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-2 text-neutral">Privacy Policy</h1>
        <p className="text-neutral-content/60 mb-12">
          Your information matters to us and we are committed to protecting your privacy
        </p>

        <div className="space-y-8">
          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">About Our Privacy Policy</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              Our privacy policy explains how we collect, use, and protect your personal information. By using Chadisho services, you acknowledge that you have read and understood our privacy policy.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Information Collection</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              We collect personal information in the following cases:
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-neutral-content/80 space-y-2">
              <li>Registration information (name, email, phone, address)</li>
              <li>Transaction and payment information</li>
              <li>Website and service usage information</li>
              <li>Communications between you and us</li>
            </ul>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Use of Information</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-neutral-content/80 space-y-2">
              <li>Provide and improve our services</li>
              <li>Process your transactions</li>
              <li>Send important messages and account information</li>
              <li>Respond to your requests</li>
              <li>Conduct research and analysis</li>
              <li>Comply with legal requirements</li>
            </ul>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Information Protection</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              We make every effort to protect your personal information. We implement appropriate security measures to prevent unauthorized access, modification, and deletion.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Information Sharing</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              We do not share your personal information with third parties or companies except:
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-neutral-content/80 space-y-2">
              <li>With your explicit consent</li>
              <li>For payment processing and related services</li>
              <li>When required by law</li>
              <li>To protect our rights</li>
            </ul>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Cookies and Tracking Technologies</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              We use cookies and similar technologies to improve user experience, analyze website usage, and display relevant advertisements. You can change your browser settings to control cookies.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Your Rights</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              You have the following rights:
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-neutral-content/80 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete information (with limitations)</li>
              <li>Restrict processing</li>
              <li>Request information about how we use your data</li>
            </ul>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Changes to Privacy Policy</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              We may modify this privacy policy as needed. Important changes will be notified to you via email or notice on the website.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Contact Us</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              If you have any questions or concerns about privacy, please contact us:
            </p>
            <div className="mt-4 text-sm text-neutral-content/80 space-y-2">
              <p><strong>Email:</strong> softbaran@gmail.com</p>
              <p><strong>Phone:</strong> 021-91090093</p>
            </div>
          </section>
        </div>
      </div>

      <HomeFooter t={t} locale={locale} />
    </main>
  );
}
