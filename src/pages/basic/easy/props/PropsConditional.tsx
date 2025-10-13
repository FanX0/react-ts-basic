import { useState } from 'react';
import AppBasicLayout from '@/modules/basic/layout/AppBasicLayout';
import Section from '@/modules/basic/ui/Section';

function MaybeRender({ show }: { show: boolean }) {
  if (!show) return null; // null component
  return <p>Visible only when <code>show</code> is true.</p>;
}

export default function PropsConditional() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  return (
    <AppBasicLayout title="Conditional Rendering">
      <p>Common conditional patterns: null component, ternary, logical AND.</p>

      <Section title="Controls">
        <button onClick={() => setShow((s) => !s)}>Toggle show: {String(show)}</button>
        <button onClick={() => setCount((c) => c + 1)} style={{ marginLeft: 8 }}>Inc count: {count}</button>
      </Section>

      <Section title="Null Component">
        <MaybeRender show={show} />
      </Section>

      <Section title="Ternary Operator">
        <p>{show ? 'Shown' : 'Hidden'}</p>
      </Section>

      <Section title="Logical AND">
        {count > 0 && <p>Count is greater than 0</p>}
      </Section>
    </AppBasicLayout>
  );
}