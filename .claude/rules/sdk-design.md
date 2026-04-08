# SDK Design Principles

## Independence

- SDK must not impose styling frameworks on consumers (no Tailwind in SDK)
- SDK styles use CSS Modules for isolation
- CSS Custom Properties for theming (`--sdk-*` prefix)
- React is a peer dependency, not bundled

## Dual Integration Path

- Each component works standalone (with onChange/onSubmit callbacks)
- Components also work inside `IdentityVerificationProvider` (context-aware)
- `getIdentityData()` is a pure function — no side effects, no context reading

## Exports

- All public types exported from `src/types/index.ts`
- Zod schemas exported for consumer reuse
- CSS exported as separate entry (`@skyrent/identity-sdk/styles`)
