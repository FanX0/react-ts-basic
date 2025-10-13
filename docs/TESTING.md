# Testing Guide (Beginner)

This project uses **Vitest** and **@testing-library/react** with a **jsdom** environment.

## Setup
- Dependencies are already listed in `package.json`.
- Test config is in `vite.config.js` under the `test` key:
  - `environment: 'jsdom'`
  - `setupFiles: ['src/test/setup.ts']`
 - Global matchers: `src/test/setup-globals.d.ts` imports `@testing-library/jest-dom/vitest` to augment types
   so you can use matchers like `toBeInTheDocument()` without importing per file.

## Commands
- `npm test` — run all tests once
- `npm run test:watch` — run and re-run on file changes

## Writing Tests
- Render components with Testing Library and assert on what users see.
  ```tsx
  import { render, screen } from '@testing-library/react';
  import { describe, it, expect } from 'vitest';
  import ComponentEasy from '@/pages/basic/easy/ComponentEasy';

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
  // Match the component's import path. Use the @ alias consistently:
  vi.mock('@/hooks/useFetch', () => ({ useFetch: () => ({ data: {}, loading: false, error: null }) }));
  ```

### Mock Path Alignment
- Ensure the mocked module specifier matches how the component imports it; otherwise spies won’t attach.
- Examples:
  ```tsx
  // Mock axios-based services used by pages under axios/crud/*
  vi.mock('@/services/api.axios', () => ({
    listDestinations: vi.fn(),
    createDestination: vi.fn(),
    updateDestination: vi.fn(),
    deleteDestination: vi.fn(),
  }));

  // Mock fetch-based services used by pages under fetch/crud/*
  vi.mock('@/services/api', () => ({
    listDestinations: vi.fn(),
    createDestination: vi.fn(),
    updateDestination: vi.fn(),
    deleteDestination: vi.fn(),
  }));
  ```

### Troubleshooting
- “is not a spy or a call to a spy”: mock the exact import path used by the component.
- Base path issues: use relative `'data.json'` (not `'/data.json'`) to work under Vite’s `base`.

## Tips
- Test behavior (text, buttons, lists), not implementation details.
- Prefer `findBy*` queries for async content.
- Use `waitFor` when asserting after async actions.
- Keep tests small and focused.