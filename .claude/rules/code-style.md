# Code Style

## Comments

Minimal comments. Only when the logic is genuinely non-obvious. Do not comment:
- Types and interfaces — naming should be self-explanatory
- Component props — TypeScript types speak for themselves
- Obvious operations (CRUD, formatting, validation)
- Section dividers (`// ---- Section ----`)

A comment is needed only if a reader would inevitably ask "why is this done this way?".

## File Organization

- Types and interfaces → `types.ts` next to the component
- Constants → `constants.ts`
- Helpers → separate files
- Component file should contain only the component itself

## General Rules

- Use `pnpm` — never npm or yarn
- Do not modify code unrelated to the current task
- No `Array.prototype.reduce` — use `for...of` or `.map`/`.filter`
- No `console.log()` — use `console.warn` or `console.error` if needed
- Always use curly braces for blocks
- Use strict equality (`===`)
- Use `const` when possible
- No unnecessary `return await`
- No empty functions
- No bitwise operators
- No multi-variable assignments (`let a = b = 1`)
- Minimum identifier length: 2 characters (except `i` and `_`)

## Before Every Commit

Run Biome on all modified files and fix errors before committing:

```bash
pnpm lint:fix
```

If there are remaining errors that can't be auto-fixed — resolve manually. Do not commit code with lint errors.
