export function slugifyTitle(value: string, fallback = 'item'): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return fallback;
  }

  return trimmedValue
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}
