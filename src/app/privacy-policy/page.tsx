import type { Metadata } from 'next';
import type { AppLocale } from '../../core/i18n/globalLocale';
import { getHomeTranslations } from '../../core/i18n/commonLocale';
import HomeNavbar from '../../features/home/components/HomeNavbar';
import HomeFooter from '../../features/home/components/HomeFooter';
import { resolveHomeLocale } from '../../features/home/api/homeLocale';

const SITE_URL = 'https://chadisho.com';

export const metadata: Metadata = {
  title: 'سیاست حریم خصوصی | چادیشو',
  description: 'سیاست حریم خصوصی چادیشو',
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

export default async function Page() {
  const locale = (await resolveHomeLocale()) as AppLocale;
  const t = getHomeTranslations(locale);

  return (
    <main className="min-h-screen bg-background text-text overflow-x-hidden">
      <HomeNavbar locale={locale} t={t} />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-2 text-neutral">سیاست حریم خصوصی</h1>
        <p className="text-neutral-content/60 mb-12">
          اطلاعات شما برای ما اهمیت دارد و ما به حفاظت از حریم خصوصی شما متعهد هستیم
        </p>

        <div className="space-y-8">
          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">درباره حریم خصوصی</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              سیاست حریم خصوصی ما توضیح می‌دهد چگونه اطلاعات شخصی شما را جمع‌آوری، استفاده و محافظت می‌کنیم. با استفاده از خدمات چادیشو، شما قبول می‌کنید که سیاست حریم خصوصی ما را خوانده و درک کرده‌اید.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">جمع‌آوری اطلاعات</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              ما اطلاعات شخصی را در موارد زیر جمع‌آوری می‌کنیم:
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-neutral-content/80 space-y-2">
              <li>اطلاعات ثبت‌نام (نام، ایمیل، تلفن، آدرس)</li>
              <li>اطلاعات تراکنش و پرداخت</li>
              <li>اطلاعات استفاده از سایت و خدمات</li>
              <li>ارتباطات بین شما و ما</li>
            </ul>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">استفاده از اطلاعات</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              ما از اطلاعات شما برای اهداف زیر استفاده می‌کنیم:
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-neutral-content/80 space-y-2">
              <li>ارائه و بهبود خدمات ما</li>
              <li>پردازش تراکنش‌های شما</li>
              <li>ارسال پیام‌های مهم و اطلاعات حساب</li>
              <li>پاسخ دادن به درخواست‌های شما</li>
              <li>انجام تحقیقات و تجزیه و تحلیل</li>
              <li>رعایت قوانین و الزامات قانونی</li>
            </ul>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">حفاظت از اطلاعات</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              ما تمام سعی خود را برای حفاظت از اطلاعات شخصی شما می‌کنیم. ما اقدامات امنیتی مناسب را اعمال می‌کنیم تا از دسترسی غیرمجاز، تغییر و حذف جلوگیری کنیم.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">اشتراک اطلاعات</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              ما اطلاعات شخصی شما را با اشخاص یا شرکت‌های ثالث به اشتراک نمی‌گذاریم مگر:
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-neutral-content/80 space-y-2">
              <li>با رضایت صریح شما</li>
              <li>برای پردازش پرداخت و خدمات مرتبط</li>
              <li>زمانی که قانون الزام می‌کند</li>
              <li>برای حفاظت از حقوق ما</li>
            </ul>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">کوکی‌ها و تکنولوژی‌های پیگیری</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              ما از کوکی‌ها و تکنولوژی‌های مشابه برای بهبود تجربه کاربر، تجزیه و تحلیل استفاده سایت، و نمایش تبلیغات مرتبط استفاده می‌کنیم. شما می‌توانید تنظیمات مرورگر خود را تغییر دهید تا کوکی‌ها را کنترل کنید.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">حقوق شما</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              شما حقوق زیر را دارید:
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-neutral-content/80 space-y-2">
              <li>دسترسی به اطلاعات شخصی شما</li>
              <li>تصحیح اطلاعات نادرست</li>
              <li>حذف اطلاعات (با محدودیت‌هایی)</li>
              <li>محدود کردن پردازش</li>
              <li>درخواست برای اطلاع از نحوه استفاده از داده‌های شما</li>
            </ul>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">تغییرات در سیاست حریم خصوصی</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              ما ممکن است این سیاست حریم خصوصی را بر حسب نیاز تغییر دهیم. تغییرات مهم از طریق ایمیل یا اطلاع‌رسانی بر روی سایت به شما اطلاع داده خواهد شد.
            </p>
          </section>

          <section className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-200">
            <h2 className="text-xl font-bold mb-4 text-neutral">تماس با ما</h2>
            <p className="text-sm leading-relaxed text-neutral-content/80">
              اگر سؤالات یا نگرانی‌های مربوط به حریم خصوصی دارید، لطفاً با ما تماس بگیرید:
            </p>
            <div className="mt-4 text-sm text-neutral-content/80 space-y-2">
              <p><strong>ایمیل:</strong> softbaran@gmail.com</p>
              <p><strong>تلفن:</strong> 021-91090093</p>
            </div>
          </section>
        </div>
      </div>

      <HomeFooter t={t} locale={locale} />
    </main>
  );
}
