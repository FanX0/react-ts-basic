# Testing Guide (Beginner)

This project uses **Vitest** and **@testing-library/react** with a **jsdom** environment.

## Setup
- Dependencies are already listed in `package.json`.
- Test config is in `vite.config.js` under the `test` key:
  - `environment: 'jsdom'`
  - `setupFiles: ['src/test/setup.ts']`

## Commands
- `npm test` — run all tests once
- `npm run test:watch` — run and re-run on file changes

## Writing Tests
- Render components with Testing Library and assert on what users see.
  ```tsx
  import { render, screen } from '@testing-library/react';
  import { describe, it, expect } from 'vitest';
  import ComponentEasy from 'src/pages/basic/easy/ComponentEasy.tsx';

  describe('ComponentEasy', () => {
    it('renders heading', () => {
      render(<ComponentEasy />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });
  ```

## Mocking
- Fetch API
  ```tsx
  import { vi } from 'vitest';
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({}) } as Response);
  ```
- Axios
  ```tsx
  import { vi } from 'vitest';
  vi.mock('axios', () => ({ default: { get: vi.fn().mockResolvedValue({ data: {} }) } }));
  ```
- Custom hooks
  ```tsx
  import { vi } from 'vitest';
  vi.mock('src/hooks/useFetch', () => ({ useFetch: () => ({ data: {}, loading: false, error: null }) }));
  ```

## Tips
- Test behavior (text, buttons, lists), not implementation details.
- Prefer `findBy*` queries for async content.
- Use `waitFor` when asserting after async actions.
- Keep tests small and focused.