import type { Metadata } from 'next';
import type { AppLocale } from '../../../core/i18n/globalLocale';
import { getHomeTranslations } from '../../../core/i18n/commonLocale';
import HomeNavbar from '../../../features/home/components/HomeNavbar';
import HomeFooter from '../../../features/home/components/HomeFooter';

const SITE_URL = 'https://chadisho.com';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Chadisho',
  description: 'Terms and Conditions of Using Chadisho Services',
  alternates: {
    canonical: `${SITE_URL}/en/terms-and-conditions`,
  },
};

export default function Page() {
  const locale = 'en' as AppLocale;
  const t = getHomeTranslations(locale);

  return (
    <main className="min-h-screen bg-background text-text overflow-x-hidden">
      <HomeNavbar locale={locale} t={t} />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-2 text-neutral">Terms and Conditions</h1>
        <p className="text-neutral-content/60 mb-12">
          Please read the following terms and conditions carefully
        </p>

        <div className="space-y-8">
          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Terms and Conditions of Using Chadisho Services</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              This agreement is entered into between Timaj Sanaate Pars (private joint company) with registration number 17809, referred to in this agreement as "Chadisho" on one hand, and you, referred to in this agreement as "user", "subscriber" or "buyer" on the other hand, and is enforceable. Entering the Chadisho website, purchasing any of Chadisho services or products, using free or paid Chadisho services, or any transaction with Chadisho requires acceptance of all parts of these terms and conditions. If you order any service or product from Chadisho, you have accepted these terms.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Responsibility for Content</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              Users are required not to use criminal content or content against the laws of the Islamic Republic of Iran on their website. In case of using criminal content, Chadisho reserves the right to terminate the contract and service without refunding the user's fee. Users are responsible for all content and images they use on their website, and Chadisho accepts no responsibility.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Account Security</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              Users are responsible for maintaining the confidentiality of their passwords and account information on Chadisho. Users are responsible for all activities conducted through their account. If unauthorized use occurs, users must notify Chadisho immediately. Chadisho is not responsible for any damage resulting from someone else's use of your password or account information. Users should not use simple passwords and should keep their passwords in a safe place.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Privacy and Confidential Information</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              All user information is protected by Chadisho, and Chadisho is committed to not providing user information to any natural or legal person under any circumstances except by court order. Chadisho makes all efforts to protect user information, but if this information is stolen in any way, Chadisho is not responsible for the security of information on its servers.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Data Backup</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              Chadisho backs up all its services on a weekly basis. This backup is solely for internal Chadisho operations and may not include a specific user's information. Users accept that they are responsible for maintaining their own information. If any problem occurs, Chadisho will make every effort to restore user data. However, if for any reason it is not possible to restore user data from Chadisho backups, Chadisho will not be held responsible.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Intellectual Property</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              All rights and benefits related to the intellectual property of Chadisho products and services belong to Chadisho. Users agree that no profit or benefit in this intellectual property will be transferred to them.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Service Cancellation</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              Most Chadisho services include free use before purchase to ensure users are satisfied with the quality of service. If for any reason, including dissatisfaction with quality, unmet needs, lack of prior knowledge, purchase error, or any other reason, users decide to cancel their service, no amount will be refunded under any circumstances.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">Future Changes to This Agreement</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              All users are required to comply with all terms of this agreement. However, these terms are not complete and comprehensive, and Chadisho reserves the right to delete or modify any part of this agreement at any time or add new terms. Buyers are obligated to always read and be informed of these terms and conditions. Lack of user awareness of changed terms will not relieve users of responsibility.
            </p>
          </section>
        </div>
      </div>

      <HomeFooter t={t} locale={locale} />
    </main>
  );
}
