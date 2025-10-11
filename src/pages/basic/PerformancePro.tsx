import { memo, useState } from 'react';

type Item = { id: number; name: string };

const ItemRow = memo(function ItemRow({ item }: { item: Item }) {
  return <li>{item.name}</li>;
});

export default function PerformancePro() {
  const [tick, setTick] = useState(0);
  const items: Item[] = Array.from({ length: 500 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}` }));

  return (
    <div style={{ padding: 16 }}>
      <h2>Performance</h2>
      <p>Use <code>memo</code> to avoid unnecessary re-renders for stable props.</p>
      <button onClick={() => setTick((t) => t + 1)}>Unrelated state change: {tick}</button>
      <ul style={{ marginTop: 12 }}>
        {items.map((it) => (
          <ItemRow key={it.id} item={it} />
        ))}
      </ul>
      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </div>
  );
}