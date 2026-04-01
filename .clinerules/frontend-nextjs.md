# Project Rules — Next.js SSR + Clean Architecture + i18n + Theme

You are working on a production-grade Next.js application.
Follow these rules in every task unless the user explicitly overrides them.

## 1) Core stack and architecture
- Use Next.js App Router.
- Prefer Server Components by default.
- Use Client Components only when interactivity is required.
- Follow feature-based clean architecture.
- Keep project structure scalable and maintainable.
- Do not flatten features into a single shared folder.
- Preserve separation of concerns across UI, data, and domain logic.

## 2) Project structure
Use and preserve this structure:

src/
  app/
  core/
    i18n/
    theme/
    config/
    lib/
    types/
    constants/
  features/
    home/
      api/
      components/
      pages/
      hooks/
      model/
    catalog/
      api/
      components/
      pages/
      hooks/
      model/
    product/
      api/
      components/
      pages/
      hooks/
      model/
    shop/
      api/
      components/
      pages/
      hooks/
      model/

Rules:
- Keep feature code inside its own feature folder.
- Shared cross-feature code goes only into core/.
- Do not place API calls directly inside UI components.
- Do not put business logic into page components.
- Keep page files thin and orchestration-focused.

## 3) Routing rules
Use Next.js App Router routes.

Required routes:
- `/`
- `/catalog/[catalogCode]/[catalogTitle]`
- `/product/[productCode]/[productTitle]`
- `/shop/[shopUsername]`

Routing behavior:
- For product pages, use only the value after `chp-` as the product code.
- For catalog pages, use only the value after `chc-` as the catalog code.
- For shop pages, use the route segment as the shop slug / username.
- Route parsing must be robust and isolated from UI rendering.

## 4) SSR and data fetching
- Prefer server-side data fetching for page-level initial data.
- Do not use `useEffect` for initial page data that can be fetched on the server.
- Do not use client-side fetching for first render unless there is a clear reason.
- Keep data-fetching functions in feature api/ or services/ folders.
- Pages should fetch data on the server and pass structured props to components.
- Client-side data fetching is allowed only for interactive states such as filters, pagination, optimistic updates, or refreshable widgets.

## 5) TypeScript model rules
- Use strict TypeScript.
- Never rely on raw API responses directly in UI.
- Define explicit types for server responses and app models.
- Create mapper functions to transform API responses into app-safe models.
- Avoid `any`.
- Prefer `type` unless `interface` is clearly better.
- Put model types in `types/`.
- Put transformation logic in `mappers/`.

Preferred pattern:
- API response type
- App model type
- Mapper function
- Server/service fetch function
- UI consumption

## 6) API and state rules
- API calls must live in `api/` or `services/`.
- UI components must never call fetch directly.
- Keep error handling centralized and predictable.
- Return normalized data from the data layer.
- When no client interactivity is needed, do not introduce unnecessary client state libraries.
- If client state becomes necessary, keep it scoped and minimal.
- Do not introduce Zustand, React Query, or similar unless the feature truly needs client-side synchronization or interactive caching.
- Prefer simple server-first patterns.

## 7) UI component rules
- Components must be small, focused, and reusable.
- Separate presentational components from data orchestration.
- Do not mix route parsing, business rules, and rendering in the same component.
- Avoid giant components.
- Extract repeated UI blocks into reusable feature components.
- Use semantic HTML where possible.
- Keep accessibility in mind.

## 8) Styling and design system
- Use Tailwind CSS.
- Build a reusable design system gradually.
- Use semantic color tokens rather than hardcoded raw colors in components.
- Use tokens such as:
  - primary
  - secondary
  - background
  - surface
  - text
  - muted
  - border
  - success
  - warning
  - danger

## 9) Dark and light theme
The application must support both dark and light mode.

Rules:
- Implement theme using Tailwind with class-based dark mode.
- Theme must be global and consistent.
- Support:
  - light
  - dark
  - system
- Respect system preference by default.
- Persist user preference.
- Avoid hardcoded colors that break in dark mode.
- Every new UI implementation must be checked in both light and dark modes.
- Components must remain readable and visually balanced in both themes.

## 10) Internationalization (Persian + English)
The application must support both Persian and English.

Rules:
- Never hardcode static user-facing text directly inside UI components.
- All visible strings must come from translation resources.
- Support at least:
  - `fa`
  - `en`
- Keep translations organized in a dedicated i18n structure.
- Use semantic translation keys, not raw sentence-like keys.

Example key style:
- `catalog.emptyState.title`
- `catalog.emptyState.description`
- `product.price.label`

## 11) RTL / LTR behavior
Language-aware direction must be fully supported.

Rules:
- Persian uses RTL.
- English uses LTR.
- Set `dir` correctly at the document or layout level based on active language.
- UI must adapt correctly for both directions.
- Avoid direction-sensitive hacks.
- Prefer logical CSS utilities and Tailwind patterns that behave well across RTL and LTR.
- Check spacing, icon alignment, text alignment, and layout flow in both directions.

## 12) Static text policy
- Do not leave placeholder English text like "Loading..." or "Error occurred" hardcoded in production code.
- Even loading, empty, and error messages must come from translations.
- Temporary debug text is allowed only when explicitly requested by the user and should be easy to remove.
- When prototyping, still wire text through the translation layer.

## 13) Catalog / Product / Shop implementation rules
For all user-facing pages:
- Render initial data through SSR where possible.
- Keep UI rendering separate from data fetching.
- Handle:
  - loading state
  - error state
  - empty state
  - success state
- Each state must be translatable and theme-compatible.
- Do not implement visual clutter.
- Keep layout clean and production-oriented.

## 14) Landing page rules
For the home page:
- Treat it as an application landing page.
- Content must be translatable.
- Theme and direction support must work correctly.
- Build sections as reusable components.
- Avoid embedding large blocks of static text directly into page files.

## 15) Code quality rules
- Prefer clarity over cleverness.
- Avoid overengineering.
- Avoid dead code.
- Avoid unnecessary abstractions.
- Add comments only where intent is not obvious.
- Keep naming explicit and consistent.
- Do not silently change project architecture.
- Do not introduce a new library unless it solves a real problem.

## 16) File creation and refactoring rules
When creating or editing files:
- Reuse existing patterns before inventing new ones.
- Preserve naming consistency.
- Do not move unrelated files.
- Refactor incrementally.
- Keep diffs focused.
- When adding a new feature, fit it into the existing architecture rather than bypassing it.

## 17) What to do before writing code
Before implementing:
- Inspect relevant existing files and patterns.
- Follow the project's established architecture.
- Prefer extension over replacement.
- If something is ambiguous, choose the simpler architecture-consistent path.

## 18) What to avoid
Never:
- hardcode visible text in components
- hardcode colors without theme tokens
- ignore RTL/LTR requirements
- fetch initial page data in `useEffect` unnecessarily
- call APIs directly in UI
- use raw API responses directly in rendering
- create huge page files with mixed responsibilities
- break SSR unnecessarily by converting everything to client components

## 19) Output expectations
When asked to implement features:
- produce clean, minimal, production-minded code
- respect SSR-first architecture
- respect i18n and direction requirements
- respect dark/light theme requirements
- keep code modular and maintainable
- prefer placeholders over fake finished UI if the user has not requested full UI yet

## 20) Priority order
If there is a tradeoff, prioritize in this order:
1. Correctness
2. Architecture consistency
3. SSR-first approach
4. i18n and RTL/LTR correctness
5. Theme compatibility
6. Reusability
7. Visual polish