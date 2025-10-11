import type { ReactNode } from 'react';

export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3>{title}</h3>
      <div style={{ display: 'grid', gap: 8 }}>{children}</div>
    </section>
  );
}