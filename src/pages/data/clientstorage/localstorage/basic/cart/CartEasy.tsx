import { useEffect, useMemo, useState } from 'react';
import AppBasicLayout from '@/modules/basic/layout/AppBasicLayout';
import Section from '@/modules/basic/ui/Section';
import Card from '@/modules/basic/ui/Card';
import Button from '@/modules/basic/ui/Button';
import * as cartStore from '@/services/cart';

function clampQty(n: number): number {
  return Math.max(1, Math.floor(Number.isFinite(n) ? n : 1));
}

export default function CartEasy() {
  const [items, setItems] = useState<cartStore.CartItem[]>([]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState<number>(1);

  // Load existing snapshot from localStorage
  useEffect(() => {
    setItems(cartStore.load());
  }, []);

  const totalQty = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.qty || 0), 0),
    [items]
  );

  // Easy: add item and manual save/load
  const add = () => {
    const n = name.trim();
    const q = clampQty(Number(qty));
    if (!n || q <= 0) return;
    const nextId = (items.reduce((m, it) => Math.max(m, Number(it.id)), 0) || 0) + 1;
    const next = [...items, { id: nextId, name: n, qty: q }];
    setItems(next);
    setName('');
    setQty(1);
  };

  const save = () => {
    cartStore.save(items);
  };
  const load = () => setItems(cartStore.load());
  const clearStorage = () => cartStore.clear();
  const clearState = () => setItems([]);

  return (
    <AppBasicLayout title="LocalStorage Cart: Easy">
      <Section title="Add and Snapshot">
        <Card>
          <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
            <input
              placeholder="Item name"
              aria-label="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Qty"
              aria-label="Qty"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
            <Button onClick={add}>Add item</Button>
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button onClick={save}>Save snapshot</Button>
            <Button onClick={load}>Load snapshot</Button>
            <Button onClick={clearStorage}>Clear localStorage</Button>
            <Button onClick={clearState}>Clear state</Button>
          </div>

          <p style={{ marginTop: 12 }}>Total quantity: <strong>{totalQty}</strong></p>

          <ul style={{ marginTop: 8 }}>
            {items.map((it) => (
              <li key={it.id}>
                {it.name} — qty: {it.qty}
              </li>
            ))}
          </ul>

          <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            Data persists under <code>"cart"</code> in localStorage via <code>src/services/cart.ts</code>.
          </p>
        </Card>
      </Section>

      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </AppBasicLayout>
  );
}