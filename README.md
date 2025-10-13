# React TS Basic

Beginner-friendly React + Vite project focused on learning core concepts with TypeScript: components, props, lists/keys, effects, data fetching with `fetch` and `axios`, and CRUD patterns using hooks and React Hook Form.

## Quick Start
 - Install dependencies: `npm install`
  - Start dev server: `npm run dev`
    - App runs at `http://localhost:5173/` (or your chosen port). For GitHub Pages, the base path is `/react-ts-basic/`.
  - Build for production: `npm run build`
  - Preview build locally: `npm run preview`

## Prerequisites
- Node `20.19+` (recommend Node `22`)
- npm `10+`
- Git (optional, for cloning and version control)

## Getting Started: JSON Server
- Run the mock API locally:
  - `npm run server` — starts JSON Server at `http://localhost:3000` serving `db.json`.
- Configure development environment:
  ```env
  # .env.development
  VITE_API_BASE_URL=http://localhost:3000
  VITE_USE_STATIC_DATA=false
  ```
- Use CRUD pages under `src/pages/requests/*/crud/*`.
- Endpoints (JSON Server):
  - `GET /destinations`
  - `POST /destinations`
  - `PATCH /destinations/:id`
  - `DELETE /destinations/:id`
- Axios base URL comes from `src/services/http.ts` via `VITE_API_BASE_URL`.
- Tip: If you see CORS errors with a remote API, enable CORS for your site origin.

## Learning Map
- Basics (UI + Layout)
  - `@/modules/basic/layout/AppBasicLayout` — simple page layout
  - `@/modules/basic/ui/{Section, Card, Button}` — basic UI blocks
  - Import via barrels: `@/modules/basic/{layout|ui}`
- Props Lessons
  - `src/pages/basic/easy/props/*` — intro, destructuring, spread, children, conditional
- Requests (Data Fetching)
  - `@/pages/requests/fetch/*` — fetch basics, typed fetch, hooks, CRUD
  - `@/pages/requests/axios/*` — axios basics, typed axios, hooks, CRUD
  - `@/pages/requests/sessionstorage/*` — client-side storage examples (read-only juststorage and full CRUD)

## Project Structure
```
src/
  components/          # global primitives (accordion, tabs, disclosure, header)
  modules/basic/       # feature module (layout + UI) with barrels
  pages/               # route pages (basic lessons, requests examples)
  hooks/               # reusable data hooks (fetch, axios, CRUD)
  services/            # API services (axios + JSON Server)
                      # plus client storage helpers (sessionStorage)
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
- `npm server` — run json-server
- `npm test` — run tests once
- `npm run test:watch` — run tests in watch mode
- `npm run lint` — run ESLint

## Testing
- Vitest + Testing Library with `jsdom` environment.
- Config: `vite.config.js` (`test.environment`, `test.setupFiles`), setup in `src/test/setup.ts`.
- Global matchers: types are augmented via `src/test/setup-globals.d.ts` with `@testing-library/jest-dom/vitest` — no per-file imports needed.
- Guide: see `docs/TESTING.md`.
 - SessionStorage tests: seed and clear `sessionStorage` within each test.
   ```ts
   beforeEach(() => sessionStorage.clear());
   sessionStorage.setItem('destinations', JSON.stringify([{ id: 1, name: 'Moon', description: "Earth's natural satellite" }]));
   ```

## Path Alias
- Configured in `tsconfig.json` and `vite.config.js`:
  - `@/*` → `src/*`
  - Vite resolves `@` via `fileURLToPath(new URL('./src', import.meta.url))` for cross-platform builds
- Use `@` imports without `.ts/.tsx` extensions, e.g. `import { Section } from '@/modules/basic/ui'`.

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
- CI builds use Node `22` (see `.github/workflows/deploy.yml`).

## CRUD Modes
- Static demo (read-only): lists from `data.json`, mutations disabled.
- API-backed CRUD: lists and mutations via `/destinations` on your API.
  - Services: `src/services/api.ts` (fetch) and `src/services/api.axios.ts` (axios)
  - Hooks: `src/hooks/useDestinationsCrud*.ts`
  - UI pages under `src/pages/requests/*/crud/*`

## SessionStorage (Client Storage)
- Read-only examples under `src/pages/requests/sessionstorage/juststorage/*`:
  - Easy and Typed pages mirror "fetch justfetch" but read-only (no create/edit/delete).
  - Hook variant (`StorageHook`) shows a refresh of client data.
- Full CRUD examples under `src/pages/requests/sessionstorage/crud/*`:
  - Easy, Hook, Typed, RHF, Zod, and RHF + Zod variants using `src/services/sessionStorage.ts` and `src/hooks/useDestinationsSessionStorage.ts`.
  - Zod/RHF variants validate inputs using `src/schemas/destination.ts`.
  - All tests seed `sessionStorage` per-spec and assert visible flows.

## Contributing & Commit Style
- Use feature-scoped commits to keep history clean:
  - `basic: add module README (layout, ui, barrels)`
  - `props: add lessons README`
  - `requests: add CRUD examples with hooks`
- Prefer branches per feature: `feature/<name>` then PR.

## Useful Docs
- `src/modules/basic/README.md` — layout/UI props and usage
- `src/pages/basic/easy/props/README.md` — props lessons
- `src/pages/requests/README.md` — fetch/axios/sessionStorage overview, env flags, mocking
- `docs/TESTING.md` — testing setup and examples

## Tech Stack
- `react` + `vite` + `@vitejs/plugin-react`
- `react-router`
- `vitest` + `@testing-library/react`
- `tailwindcss`
- `react-hook-form` + `zod`
- `axios`
