export function normalizeWebsiteUrl(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return '#';
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

export function extractHandle(value: string): string {
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

export function resolveSocialHref(key: string, value: string): string {
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
