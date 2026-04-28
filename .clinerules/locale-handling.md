## Brief overview
- Project-specific locale handling rules for all new pages and page-level locale resolution.
- Goal: keep locale behavior consistent across SSR routes, feature pages, and UI direction/translation rendering.

## Locale source of truth
- Global locale cookie (`LOCALE_COOKIE_KEY`) is the primary source of truth for selected language.
- Use server-side cookie reading for route-level initial locale in App Router pages.
- Keep a single default locale constant (`DEFAULT_APP_LOCALE`) and use it instead of hardcoded fallback strings.

## New page implementation rules
- For every new route page (`src/app/**/page.tsx`), resolve locale on the server with `cookies()` + `resolveAppLocale`.
- If cookie locale is missing/invalid, fallback to `DEFAULT_APP_LOCALE`.
- Pass resolved locale to feature/page components via explicit props (e.g., `locale` or `localeOverride`).

## Feature page locale resolution
- Feature pages should prioritize route-provided locale override when available.
- If no override exists, feature-specific fallback logic may use API language fields.
- Do not mix unrelated data heuristics with user-selected locale when an override exists.

## Catalog/Product/Shop consistency
- Catalog, product, and shop pages must follow the same precedence order:
  1. locale from cookie/route override
  2. feature data language fallback
  3. default app locale
- Keep direction (`dir`) and text alignment derived from resolved locale only.

## Cookie utility boundaries
- Avoid mutating cookies in shared pure resolver functions unless explicitly required.
- If cookie write is needed from UI interaction, do it in client-side event handlers/utilities.
- Guard browser-only cookie access with runtime checks (e.g., `typeof document !== 'undefined'`).

## UI rendering expectations
- All visible strings must come from translation resources.
- Locale changes must update translations and direction together.
- Preserve explicit product/business display rules requested by user (example: shop header title can remain `faName` in all locales when requested).
