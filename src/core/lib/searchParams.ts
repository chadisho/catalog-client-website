export function getSearchParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
): string {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}
