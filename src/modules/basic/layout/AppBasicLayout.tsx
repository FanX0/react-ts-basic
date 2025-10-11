import type { ReactNode } from 'react';

export default function AppBasicLayout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div style={{ padding: 16 }}>
      {title && <h2>{title}</h2>}
      <div style={{ display: 'grid', gap: 16 }}>{children}</div>
    </div>
  );
}