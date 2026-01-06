# Copilot Instructions for Slot1

## Project Overview

**slot1** is a minimal React + Vite single-page application template. The project emphasizes fast development with Hot Module Replacement (HMR) and modern tooling. This is a greenfield React project with no custom architecture yet—follow standard React patterns.

## Architecture & Key Files

- **Entry Point**: `src/main.jsx` — Renders the root React component into `#root` element
- **Root Component**: `src/App.jsx` — Contains main application logic and UI
- **Styling**: `src/index.css` (global) and `src/App.css` (component-scoped)
- **Build Config**: `vite.config.js` — Minimal setup using `@vitejs/plugin-react` with Babel for Fast Refresh
- **Linting**: `eslint.config.js` — Flat config with React Hooks and React Refresh rules

## Development Workflow

**Start dev server with HMR:**
```
npm run dev
```
Changes to `src/**` files trigger instant browser reload; no manual refresh needed.

**Build for production:**
```
npm run build
```
Output goes to `dist/` directory (gitignored).

**Lint & auto-fix:**
```
npm run lint
```
ESLint config extends `js.configs.recommended` with React-specific rules.

**Preview production build:**
```
npm run preview
```

## Code Patterns & Conventions

### React Component Structure

- Use functional components with hooks (project uses React 19.2)
- State management via `useState` hook; no Redux or Context API yet
- Components should be in `src/` directory alongside `App.jsx`
- Export components as named or default exports (both supported)

### ESLint Rules

- Unused variables trigger errors, except those starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`)
- React Hooks rules enforced (dependencies, exhaustive rules)
- React Refresh rules prevent invalid exports

### Styling

- Import CSS files directly in components (e.g., `import './App.css'`)
- Global styles in `index.css` (dark theme by default)
- Scoped styles can use CSS modules or plain CSS with BEM naming

### Static Assets

- Place static files in `public/` (served at root) or `src/assets/` (imported in code)
- Assets imported in JSX (e.g., `import reactLogo from './assets/react.svg'`) get bundled by Vite

## Critical Developer Notes

- **React 19 (not TypeScript yet)**: No type safety; install `typescript` and `@types/*` if adding types
- **Vite HMR**: Fast refresh works best with functional components; avoid default exports in component chains
- **Build output**: `dist/` is the only production-ready artifact; untracked in `.gitignore`
- **No build step dependencies**: Project has no custom Node scripts beyond npm; use Vite/ESLint directly

## Integration Points

- External assets loaded from public CDN (Vite logo) or bundled (React logo)
- No external APIs, databases, or services configured
- No environment variables needed for dev; add `.env` files if future integrations require them

## When Adding Features

1. Create new components in `src/` following App.jsx naming convention
2. Run `npm run lint` before committing
3. Test changes via `npm run dev` — HMR provides instant feedback
4. If adding dependencies, run `npm install` and commit updated `package-lock.json`
