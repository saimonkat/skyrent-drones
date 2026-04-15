# SkyRent Drones

Drone rental application with integrated identity verification SDK.

**Live Demo:** [skyrent-drones.vercel.app](https://skyrent-drones.vercel.app)

## Project Structure

Monorepo with pnpm workspaces:

```
skyrent-drones/
├── packages/identity-sdk/   — Reusable identity verification SDK (Vite library mode)
└── apps/demo/               — SkyRent Drones demo application (Vite + React SPA)
```

## Tech Stack

| Layer | SDK | Demo App |
|-------|-----|----------|
| **Framework** | React 19 | React 19 + React Router |
| **Build** | Vite 6 (library mode) | Vite 6 (SPA) |
| **Styling** | CSS Modules | Tailwind CSS v4 |
| **Forms** | React Hook Form + Zod | — |
| **State** | React Context + useReducer | Zustand (persist) |
| **Phone** | libphonenumber-js | — |
| **UI primitives** | Radix UI Select | — |
| **Animation** | — | Framer Motion, Lottie |
| **Linting** | Biome | Biome |
| **Testing** | Vitest + RTL | Vitest |
| **E2E** | — | Playwright |
| **TypeScript** | 5.7 | 5.7 |

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev        # Start demo app → http://localhost:5173
pnpm dev:sdk    # Watch SDK for changes
```

### Build

```bash
pnpm build      # Build demo with SDK
pnpm build:sdk  # Build SDK only
```

### Tests

```bash
pnpm test       # Run all unit tests (SDK + demo)
pnpm test:e2e   # Run Playwright E2E test
pnpm lint       # Biome lint check
```

