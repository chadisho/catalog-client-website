export function normalizeIranianCellphone(input: string): string | null {
  const normalizedDigits = toEnglishDigits(input)
    .replace(/\s+/g, '')
    .replace(/-/g, '');

  if (!normalizedDigits) {
    return null;
  }

  if (/^09\d{9}$/.test(normalizedDigits)) {
    return normalizedDigits;
  }

  if (/^9\d{9}$/.test(normalizedDigits)) {
    return `0${normalizedDigits}`;
  }

  if (/^\+989\d{9}$/.test(normalizedDigits)) {
    return `0${normalizedDigits.slice(3)}`;
  }

  if (/^00989\d{9}$/.test(normalizedDigits)) {
    return `0${normalizedDigits.slice(4)}`;
  }

  if (/^989\d{9}$/.test(normalizedDigits)) {
    return `0${normalizedDigits.slice(2)}`;
  }

  return null;
}

function toEnglishDigits(input: string): string {
  return input.replace(/[۰-۹٠-٩]/g, (digit) => {
    const faIndex = '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit);
    if (faIndex >= 0) {
      return String(faIndex);
    }

    const arIndex = '٠١٢٣٤٥٦٧٨٩'.indexOf(digit);
    return arIndex >= 0 ? String(arIndex) : digit;
  });
}
