# Props Lessons (Beginner)

This folder contains beginner-focused lessons showing how props work in React.

## Files
- `PropsEasy.tsx` — intro to props
- `PropsDestructuring.tsx` — destructuring props
- `PropsSpreadSyntax.tsx` — spreading props into components
- `PropsChildren.tsx` — using `children`
- `PropsConditional.tsx` — conditional rendering with props & state

## What Are Props?
- Props are inputs to components; they are read-only data passed from parent to child.
- Think of components like functions: `function Hello({ name }) { return <p>Hello {name}</p>; }`

## Core Patterns
- Passing props:
  ```tsx
  <UserCard name="Ada" age={28} />
  ```
- Destructuring props:
  ```tsx
  function UserCard({ name, age }: { name: string; age: number }) {
    return <div>{name} ({age})</div>;
  }
  ```
- Spread syntax:
  ```tsx
  const props = { name: 'Ada', age: 28 };
  <UserCard {...props} />
  ```
- Children:
  ```tsx
  <Card>
    <p>Inner content goes here</p>
  </Card>
  ```
- Conditional rendering:
  ```tsx
  {show && <p>Visible only when `show` is true</p>}
  {count > 0 ? <p>Count is greater than 0</p> : <p>Hidden</p>}
  ```

## Simple Examples (from this folder)
- `PropsEasy.tsx`: shows passing string/number props and rendering them.
- `PropsDestructuring.tsx`: uses `{ title, subtitle }` directly in the function signature.
- `PropsSpreadSyntax.tsx`: demonstrates `...rest` props and forwarding to children.
- `PropsChildren.tsx`: shows how `children` makes components flexible.
- `PropsConditional.tsx`: toggles UI using `&&` and `?:`.

## Testing These Lessons
- Tests use Vitest + Testing Library.
- Run: `npm test` or `npm run test:watch`
- Example:
  ```tsx
  import { render, screen } from '@testing-library/react';
  import { describe, it, expect } from 'vitest';
  import PropsConditional from '@/pages/basic/easy/props/PropsConditional';

  describe('PropsConditional', () => {
    it('shows hidden text when toggled', () => {
      render(<PropsConditional />);
      expect(screen.getByText('Hidden')).toBeInTheDocument();
    });
  });
  ```

## Beginner Tips
- Keep props explicit; avoid overloading a single prop with multiple meanings.
- Prefer boolean and string props for toggles and labels.
- Use `children` for nested content; pass callbacks like `onClick` for behavior.

## Further Reading
- See `docs/TESTING.md` for a step-by-step testing guide.