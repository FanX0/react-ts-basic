import type { ReactNode } from 'react';

export default function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
      {title && <h4 style={{ marginTop: 0 }}>{title}</h4>}
      {children}
    </div>
  );
}