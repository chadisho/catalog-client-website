## Brief overview
- Project-specific error handling policies for API, SSR pages, and client interactions.
- Goal: show useful backend messages to users, while hiding low-quality transport-level errors.

## API error extraction rules
- Always parse backend error payloads safely before throwing (`message`, then fallback).
- If payload has `errors` as an array of strings, concatenate non-empty values and use that as the thrown message.
- Prefer normalized thrown errors (`throw new Error(message)`) so all callers can rely on `error.message`.
- Keep fallback for unknown payloads as `HTTP {status}`.

## Validation error handling
- For validation-style responses (e.g., generic invalid-data messages), prefer detailed field-level messages from `errors[]`.
- Join multiple validation entries with a readable separator (current pattern: `" | "`).
- Do not drop validation details in intermediary layers (proxy/client adapters).

## UI rendering policy
- Shared error components must show backend-provided message only when it is meaningful.
- If message is empty or starts with `HTTP`, show translated default error description instead.
- Keep user-facing fallback text localized via i18n resources.

## Toast and action-level errors
- In client action handlers (`catch` blocks), prefer `error.message` when present and non-empty.
- Fallback to translated generic toast message when no useful server message exists.
- Apply this pattern consistently for add-to-cart, update/delete cart actions, checkout, and auth actions.

## SSR and feature-page propagation
- Route-level fetch failures should capture and forward `Error.message` to feature pages.
- Feature pages should pass error message into shared `ErrorState` rather than replacing it with generic keys.
- Keep default translated fallback behavior inside `ErrorState`.

## Auth client consistency
- Auth client `parseMessage` must mirror core API error rules.
- Support parsing `message` and `errors[]` in auth routes (`login`, `check-otp`, `resend-otp`, `session`, `logout`).

## Implementation boundaries
- Do not expose raw stack traces or internal debug strings in user-facing UI.
- Do not hardcode fallback English text in components; use translation resources.
- Keep error parsing logic in data/API layers, not inside presentational UI components.