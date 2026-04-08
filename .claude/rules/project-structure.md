# Project Structure

## Monorepo Layout

- `packages/identity-sdk/` — reusable SDK library (Vite library mode)
- `apps/demo/` — SkyRent Drones demo app (Vite + React SPA)

## SDK (`@skyrent/identity-sdk`)

- `src/components/` — React components (SelfieCapture, PhoneInput, AddressForm, IdentityVerificationFlow)
- `src/context/` — IdentityVerificationProvider and hooks
- `src/core/` — getIdentityData, scoring logic
- `src/schemas/` — Zod validation schemas
- `src/types/` — all TypeScript interfaces
- `src/styles/` — CSS custom properties (theming)

## Demo App (`demo`)

- `src/pages/` — route pages (Catalog, Verify, Checkout)
- `src/components/` — UI components grouped by feature (layout, catalog, cart, verification, checkout)
- `src/stores/` — Zustand stores (cart, verification)
- `src/data/` — mock drone data and API layer
- `src/lib/` — utility functions
- `src/types/` — demo-specific types

## Commands

- `pnpm dev` — start demo dev server
- `pnpm build` — build SDK then demo
- `pnpm build:sdk` — build SDK only
- `pnpm test` — run all tests
