import {
  getLocalizedCurrencyLabel,
  type CatalogLocale,
} from '../../../core/i18n/catalogLocale';

function getIntlLocale(locale: CatalogLocale): string {
  return locale === 'fa' ? 'fa-IR' : 'en-US';
}

function normalizeIsoDateInput(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  const withTSeparator = trimmed.includes(' ') ? trimmed.replace(' ', 'T') : trimmed;

  return withTSeparator.replace(/\.(\d{3})\d+(Z|[+-]\d{2}:?\d{2})$/, '.$1$2');
}

export function toSafeNumberFromString(value: string): number | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const normalizedValue = trimmedValue.replace(/[^\d.-]/g, '');

  if (!normalizedValue) {
    return null;
  }

  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

export function formatPrice(locale: CatalogLocale, value: number): string {
  return new Intl.NumberFormat(getIntlLocale(locale)).format(value);
}

export function formatOrderTotalAmount(
  locale: CatalogLocale,
  totalAmount: string,
  currency: string
): string {
  const numericValue = toSafeNumberFromString(totalAmount);

  if (numericValue === null) {
    return '-';
  }

  return `${formatPrice(locale, numericValue)} ${getLocalizedCurrencyLabel(currency || 'toman', locale)}`;
}

export function formatOrderDateTime(locale: CatalogLocale, value: string): string {
  const normalizedValue = normalizeIsoDateInput(value);

  if (!normalizedValue) {
    return '-';
  }

  const dateValue = new Date(normalizedValue);

  if (Number.isNaN(dateValue.getTime())) {
    return '-';
  }

  const dateTimeFormat = new Intl.DateTimeFormat(
    locale === 'fa' ? 'fa-IR-u-ca-persian' : 'en-US',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
    }
  );

  return dateTimeFormat.format(dateValue);
}
