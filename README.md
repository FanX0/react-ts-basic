# React TS Basic

Beginner-friendly React + Vite project focused on learning core concepts with TypeScript: components, props, lists/keys, effects, data fetching with `fetch` and `axios`, and CRUD patterns using hooks and React Hook Form.

## Quick Start
- Requirements: `Node 18+`, `npm`
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
  - App runs at `http://localhost:5173/` (or your chosen port). For GitHub Pages, the base path is `react-ts-basic`.
- Build for production: `npm run build`
- Preview build locally: `npm run preview`

## Learning Map
- Basics (UI + Layout)
  - `src/modules/basic/layout/AppBasicLayout.tsx` — simple page layout
  - `src/modules/basic/ui/{Section.tsx, Card.tsx, Button.tsx}` — basic UI blocks
  - Import via barrels: `src/modules/basic/{layout|ui}/index.ts`
- Props Lessons
  - `src/pages/basic/easy/props/*` — intro, destructuring, spread, children, conditional
- Requests (Data Fetching)
  - `src/pages/requests/fetch/*` — fetch basics, typed fetch, hooks, CRUD
  - `src/pages/requests/axios/*` — axios basics, typed axios, hooks, CRUD

## Project Structure
```
src/
  components/          # global primitives (accordion, tabs, disclosure, header)
  modules/basic/       # feature module (layout + UI) with barrels
  pages/               # route pages (basic lessons, requests examples)
  hooks/               # reusable data hooks (fetch, axios, CRUD)
  services/            # API services (axios + JSON Server)
  schemas/             # zod schemas and types
  test/                # test setup for Vitest
```

## Key Concepts (Beginner)
- Props are inputs to components (read-only) — pass values and callbacks, render with `children`.
- Lists & keys — always use a stable `key` when rendering arrays.
- Effects — handle side-effects like data fetching in `useEffect`.
- Fetching data — use `fetch` or `axios`, and extract logic into hooks.
- CRUD — Render lists, create/update/delete, manage loading/error state.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run preview` — preview build
- `npm test` — run tests once
- `npm run test:watch` — run tests in watch mode
- `npm run lint` — run ESLint

## Testing
- Vitest + Testing Library with `jsdom` environment.
- Config: `vite.config.js` (`test.environment`, `test.setupFiles`), setup in `src/test/setup.ts`.
- Global matchers: types are augmented via `src/test/setup-globals.d.ts` with `@testing-library/jest-dom/vitest` — no per-file imports needed.
- Guide: see `docs/TESTING.md`.

## Routing & Base Path
- Uses `react-router` for pages under `src/pages`.
- When deploying to GitHub Pages, the base is configured in `vite.config.js` as `base: '/react-ts-basic/'`.

## Environment & Deployment
- Development: `.env.development`
  - `VITE_API_BASE_URL=http://localhost:3000`
  - `VITE_USE_STATIC_DATA=false`
- Production: `.env.production`
  - Read-only demo: `VITE_USE_STATIC_DATA=true` (loads `public/data.json`)
  - Enable CRUD: set `VITE_USE_STATIC_DATA=false` and provide `VITE_API_BASE_URL` to a live API
- Axios client base URL comes from `src/services/http.ts` (`VITE_API_BASE_URL`).
- Ensure CORS is allowed from your site origin when using a remote API.

## CRUD Modes
- Static demo (read-only): lists from `data.json`, mutations disabled.
- API-backed CRUD: lists and mutations via `/destinations` on your API.
  - Services: `src/services/api.ts` (fetch) and `src/services/api.axios.ts` (axios)
  - Hooks: `src/hooks/useDestinationsCrud*.ts`
  - UI pages under `src/pages/requests/*/crud/*`

## Contributing & Commit Style
- Use feature-scoped commits to keep history clean:
  - `basic: add module README (layout, ui, barrels)`
  - `props: add lessons README`
  - `requests: add CRUD examples with hooks`
- Prefer branches per feature: `feature/<name>` then PR.

## Useful Docs
- `src/modules/basic/README.md` — layout/UI props and usage
- `src/pages/basic/easy/props/README.md` — props lessons
- `src/pages/requests/README.md` — fetch/axios & CRUD overview, env flags, mocking
- `docs/TESTING.md` — testing setup and examples

## Tech Stack
- `react` + `vite` + `@vitejs/plugin-react`
- `react-router`
- `vitest` + `@testing-library/react`
- `tailwindcss`
- `react-hook-form` + `zod`
- `axios`
