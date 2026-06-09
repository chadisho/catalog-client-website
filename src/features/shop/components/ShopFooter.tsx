import { getShopBySlugCached } from '../api/shopApi';
import type { ShopInformationModel } from '../model/shopInformationModel';
import { getShopTranslations } from '../../../core/i18n/commonLocale';
import type { CommonLocale } from '../../../core/i18n/commonLocale';
import { normalizePhone, resolveSocialHref } from './shopPageUtils';

interface ShopFooterProps {
  slug: string;
  locale: CommonLocale;
}

const SOCIAL_KEYS = ['instagram', 'whatsapp', 'telegram', 'website'] as const;

function buildSocialLinks(shop: ShopInformationModel, labels: Record<string, string>) {
  return SOCIAL_KEYS.flatMap((key) => {
    const value = shop[key];
    if (!value?.trim()) return [];
    return [{ key, label: labels[key] ?? key, value: value.trim() }];
  });
}

export default async function ShopFooter({ slug, locale }: ShopFooterProps) {
  let shop: ShopInformationModel;
  try {
    shop = await getShopBySlugCached(slug);
  } catch {
    return null;
  }

  const t = getShopTranslations(locale);
  const shopName = shop.faName ?? shop.enName ?? slug;
  const profileHref = `/shop/${slug}`;

  const socialLinks = buildSocialLinks(shop, {
    instagram: t.instagram,
    whatsapp: t.whatsapp,
    telegram: t.telegram,
    website: t.website,
  });

  const firstAddress = shop.addresses?.[0] ?? null;
  const addressPhone = firstAddress
    ? `${firstAddress.preNumber ?? ''}${firstAddress.phone ?? ''}`.trim()
    : null;
  const addressPhoneHref = addressPhone ? normalizePhone(addressPhone) : null;
  const formattedAddress =
    firstAddress?.formatedAddress?.trim() ||
    firstAddress?.address?.trim() ||
    [firstAddress?.province, firstAddress?.city].filter(Boolean).join(' - ') ||
    null;

  return (
    <footer aria-label={shopName} className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-[1126px] grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">

        {/* Column 1: logo, name, description, profile link */}
        <div className="flex flex-col gap-3">
          <a
            href={profileHref}
            aria-label={t.viewShopProfile}
            className="flex items-center gap-3 group"
          >
            {shop.avatar ? (
              <img
                src={shop.avatar}
                alt={`${shopName} ${t.logoAlt}`}
                className="h-12 w-12 rounded-2xl object-cover ring-1 ring-border"
              />
            ) : (
              <div
                aria-label={`${shopName} ${t.logoAlt}`}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary ring-1 ring-border"
              >
                {shopName.charAt(0)}
              </div>
            )}
            <span className="text-base font-semibold text-text group-hover:text-primary transition-colors">
              {shopName}
            </span>
          </a>

          {shop.aboutUs?.trim() ? (
            <p className="line-clamp-3 text-sm leading-6 text-text/70">
              {shop.aboutUs.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}
            </p>
          ) : null}

          <a
            href={profileHref}
            className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary transition hover:bg-primary/10"
          >
            {t.viewShopProfile}
          </a>
        </div>

        {/* Column 2: social links */}
        <div className="flex flex-col gap-2">
          <h2 className="mb-1 text-sm font-semibold text-text">{t.contactTitle}</h2>
          {socialLinks.length > 0 ? (
            socialLinks.map((item) => {
              const href = resolveSocialHref(item.key, item.value);
              return (
                <a
                  key={item.key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} (opens in new tab)`}
                  className="inline-flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2 text-sm text-text transition hover:border-primary/40 hover:text-primary"
                >
                  <span>{item.label}</span>
                  <span dir="ltr" className="truncate ps-3 text-xs text-text/70">
                    {item.value}
                  </span>
                </a>
              );
            })
          ) : (
            <p className="text-sm text-text/70">{t.emptyContacts}</p>
          )}
        </div>

        {/* Column 3: address */}
        <div className="flex flex-col gap-2">
          <h2 className="mb-1 text-sm font-semibold text-text">{t.addressesTitle}</h2>
          {firstAddress ? (
            <article className="rounded-xl border border-border bg-background px-3 py-3">
              {firstAddress.title?.trim() || firstAddress.city?.trim() ? (
                <p className="text-sm font-semibold text-text">
                  {firstAddress.title?.trim() || firstAddress.city?.trim()}
                </p>
              ) : null}
              {formattedAddress ? (
                <p className="mt-1 text-sm leading-6 text-text/80">{formattedAddress}</p>
              ) : null}
              {addressPhone && addressPhoneHref ? (
                <a
                  dir="ltr"
                  href={`tel:${addressPhoneHref}`}
                  className="mt-2 inline-flex rounded-lg border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary"
                >
                  {t.call}: {addressPhone}
                </a>
              ) : null}
            </article>
          ) : (
            <p className="text-sm text-text/70">{t.emptyContacts}</p>
          )}
        </div>

      </div>
    </footer>
  );
}
