# Component Structure

Each React component must be placed in its own directory named in `UpperCamelCase`:

```
ComponentName/
├── ComponentName.tsx           # Main component file (mandatory)
├── ComponentName.module.css    # Styles (optional, SDK only)
├── types.ts                    # Component types (optional)
├── constants.ts                # Component constants (optional)
├── hooks/                      # Component-specific hooks (optional)
│   └── useHookName/
│       └── useHookName.ts
├── helpers/                    # Component helpers (optional)
│   └── helperName/
│       └── helperName.ts
└── components/                 # Nested subcomponents (optional)
    └── SubComponentName/
        └── SubComponentName.tsx
```

## Rules

- No `index.ts` barrel files — import directly: `from './ComponentName/ComponentName'`
- Each hook in its own directory inside `hooks/` (camelCase with `use` prefix)
- Each helper in its own directory inside `helpers/` (camelCase)
- Each subcomponent in its own directory inside `components/` (UpperCamelCase)
- Component artifacts (hooks, helpers, subcomponents) must not be used outside the component boundary
- Main component file contains only the component itself — no types, no constants, no helpers
