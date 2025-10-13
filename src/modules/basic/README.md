# Basic Module

Beginner-friendly guide for the `basic` feature module. This module provides layout and UI pieces used across the Basic pages.

## What’s Inside
- `layout/AppBasicLayout.tsx` — page layout wrapper
- `ui/Card.tsx` — simple section card
- `ui/Section.tsx` — titled section container
- `ui/Button.tsx` — small stylized button
- Barrel exports: `layout/index.ts`, `ui/index.ts`

## Installation & Usage
- Import via barrels:
  - `import { AppBasicLayout } from '@/modules/basic/layout'`
  - `import { Card, Section, Button } from '@/modules/basic/ui'`

## Props
- AppBasicLayout
  - `title: string` — page title
  - `children: ReactNode` — page content
  - Example:
    ```tsx
    <AppBasicLayout title="Basics">
      <Section title="Intro">Welcome!</Section>
    </AppBasicLayout>
    ```

- Section
  - `title: string` — section title
  - `children: ReactNode`
  - Example:
    ```tsx
    <Section title="Props">
      <Card>Props are inputs to components.</Card>
    </Section>
    ```

- Card
  - `children: ReactNode` — content
  - Optional styling via `className`
  - Example:
    ```tsx
    <Card className="p-4">Hello Card</Card>
    ```

- Button
  - `onClick?: () => void`
  - `children: ReactNode`
  - Example:
    ```tsx
    <Button onClick={() => alert('Clicked!')}>Click</Button>
    ```

## How It Works
- These components are domain-flavored for the "basic" feature.
- Use the layout to wrap pages; compose `Section`, `Card`, and `Button` inside.
- Keep them simple: presentational, minimal logic, predictable props.

## Testing (Vitest + Testing Library)
- Test environment configured in `vite.config.js` (`jsdom`).
- Global setup: `src/test/setup.ts`.
- Scripts:
  - `npm test` — run tests once
  - `npm run test:watch` — watch mode
- Example test:
  ```tsx
  import { render, screen } from '@testing-library/react';
  import { describe, it, expect } from 'vitest';
  import { Card } from '@/modules/basic/ui';

  describe('Card', () => {
    it('renders children', () => {
      render(<Card>Hello</Card>);
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });
  ```

## Tips for Beginners
- Props are inputs; treat components like functions receiving parameters.
- Keep props small and explicit; prefer `children` for inner content.
- Use barrels for clean imports and consistent APIs.

## Further Reading
- See `docs/TESTING.md` for a step-by-step testing guide.