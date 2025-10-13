# Requests Feature (Beginner)

Learn how to fetch data with `fetch` and `axios`, and how to build simple CRUD UIs. This folder is organized by transport (`fetch` vs `axios`) and by complexity (`just*` examples and `crud` examples).

## Structure
- `fetch/justfetch/*` — basic fetch, typed fetch, and a hook-based fetch
- `fetch/crud/*` — CRUD examples with fetch, including RHF (React Hook Form) and typed/zod variants
- `axios/justaxios/*` — basic axios, typed axios, and axios via hook
- `axios/crud/*` — CRUD with axios, including RHF and zod

## Key Concepts
- Fetching data
  ```tsx
  // Use a relative path so it works under Vite base
  const res = await fetch('data.json');
  const data = await res.json();
  ```
- Axios
  ```tsx
  import axios from 'axios';
  // Use a relative path so it works under Vite base
  const { data } = await axios.get('data.json');
  ```
- Hooks
  - Encapsulate loading/error/state (`src/hooks/useFetch.ts`, `src/hooks/useAxios.ts`, `src/hooks/useDestinationsCrud*.ts`).
- CRUD
  - List items, create new ones, update existing ones, and delete.

## Props & Patterns You’ll See
- Controlled inputs for forms (via React state or RHF)
- Callback props for actions: `onCreate`, `onUpdate`, `onDelete`
- Render lists with keys: `{items.map(item => <li key={item.id}>...</li>)}`
- Conditional UI based on loading/error flags

## Testing These Pages
- Tests live alongside pages and use Vitest + Testing Library.
- Common patterns:
  - Mock `fetch`:
    ```tsx
    import { vi } from 'vitest';
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ destinations: [] }) } as Response);
    ```
  - Mock `axios`:
    ```tsx
    vi.mock('axios', () => ({ default: { get: vi.fn().mockResolvedValue({ data: { destinations: [] } }) } }));
    ```
  - Mock custom hooks:
    ```tsx
    // Match the component's import location; example for files in fetch/crud/*
    vi.mock('../../../../hooks/useDestinationsCrud', () => ({
      useDestinationsCrud: () => ({ items: [], loading: false, error: null })
    }));
    ```
- Run tests:
  - `npm test` — run once
  - `npm run test:watch` — watch mode

## Environment Flags (CRUD Modes)
- `.env.production` controls behavior in deployment:
  - Read-only demo: `VITE_USE_STATIC_DATA=true` — loads data from `public/data.json`, mutations disabled.
  - Full CRUD: set `VITE_USE_STATIC_DATA=false` and provide `VITE_API_BASE_URL=https://your-api.example.com`.
- Axios base URL is configured in `src/services/http.ts` via `VITE_API_BASE_URL`.

## Beginner Tips
- Start with the `just*` examples to understand the basics.
- Use hooks to separate data fetching logic from UI.
- Write small tests that check what the user sees (text, buttons, list items).

## Further Reading
- See `docs/Testing.md` for a step-by-step testing guide.