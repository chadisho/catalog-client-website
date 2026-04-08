import type { ShopingAddressModel } from '../model/shopingAddressModel';
import { normalizePhone, normalizeWebsiteUrl } from './shopPageUtils';

type ShopContactCardProps = {
  title: string;
  addressesTitle: string;
  callLabel: string;
  emptyContactsLabel: string;
  socialLinks: Array<{
    key: string;
    label: string;
    value: string;
  }>;
  addresses: ShopingAddressModel[];
};

function extractHandle(value: string): string {
  return value
    .trim()
    .replace(/^https?:\/\/(www\.)?/i, '')
    .replace(/^instagram\.com\//i, '')
    .replace(/^t\.me\//i, '')
    .replace(/^wa\.me\//i, '')
    .replace(/^@+/, '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .split('/')[0]
    .split('?')[0]
    .trim();
}

function resolveSocialHref(key: string, value: string): string {
  const rawValue = value.trim();

  if (!rawValue) {
    return '#';
  }

  if (/^https?:\/\//i.test(rawValue)) {
    return rawValue;
  }

  if (key === 'website') {
    return normalizeWebsiteUrl(rawValue);
  }

  if (key === 'instagram') {
    const handle = extractHandle(rawValue);
    return handle ? `https://instagram.com/${handle}` : '#';
  }

  if (key === 'telegram') {
    const handle = extractHandle(rawValue);
    return handle ? `https://t.me/${handle}` : '#';
  }

  if (key === 'whatsapp') {
    const normalized = normalizePhone(rawValue).replace(/^\+/, '');
    return normalized ? `https://wa.me/${normalized}` : '#';
  }

  return rawValue;
}

export default function ShopContactCard({
  title,
  addressesTitle,
  callLabel,
  emptyContactsLabel,
  socialLinks,
  addresses,
}: ShopContactCardProps) {
  const hasAnyContact = socialLinks.length > 0 || addresses.length > 0;

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <h2 className="text-xl font-semibold text-text">{title}</h2>

      {socialLinks.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {socialLinks.map((item) => {
            const rawValue = item.value.trim();
            const href = resolveSocialHref(item.key, rawValue);

            return (
              <a
                key={item.key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2 text-sm text-text transition hover:border-primary/40 hover:text-primary"
              >
                <span>{item.label}</span>
                <span dir="ltr" className="truncate ps-3 text-xs text-text/70">
                  {rawValue}
                </span>
              </a>
            );
          })}
        </div>
      ) : null}

      {addresses.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-text/80">{addressesTitle}</h3>
          {addresses.map((address) => {
            const phoneNumber = `${address.preNumber ?? ''}${address.phone ?? ''}`.trim();
            const phoneHref = normalizePhone(phoneNumber);
            const addressTitle =
              (address.title?.trim() || address.city?.trim() || address.province?.trim() || null) ??
              addressesTitle;
            const formattedAddress =
              address.formatedAddress?.trim() ||
              address.address?.trim() ||
              [address.province, address.city].filter(Boolean).join(' - ');

            return (
              <article key={address.id} className="rounded-xl border border-border bg-background px-3 py-3">
                <p className="text-sm font-semibold text-text">{addressTitle}</p>
                {formattedAddress ? (
                  <p className="mt-1 text-sm leading-6 text-text/80">{formattedAddress}</p>
                ) : null}
                {phoneNumber ? (
                  <a
                    dir="ltr"
                    href={`tel:${phoneHref}`}
                    className="mt-2 inline-flex rounded-lg border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary"
                  >
                    {callLabel}: {phoneNumber}
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : null}

      {!hasAnyContact ? <p className="text-sm text-text/70">{emptyContactsLabel}</p> : null}
    </section>
  );
}
