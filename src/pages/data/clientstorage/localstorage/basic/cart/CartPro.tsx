import { useEffect, useMemo, useState } from 'react';
import AppBasicLayout from '@/modules/basic/layout/AppBasicLayout';
import Section from '@/modules/basic/ui/Section';
import Card from '@/modules/basic/ui/Card';
import Button from '@/modules/basic/ui/Button';
import * as cartStore from '@/services/cart';

type EditState = {
  id: number | null;
  name: string;
  qty: number;
};

function clampQty(n: number): number {
  return Math.max(1, Math.floor(Number.isFinite(n) ? n : 1));
}

export default function CartPro() {
  const [items, setItems] = useState<cartStore.CartItem[]>([]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState<number>(1);
  const [editing, setEditing] = useState<EditState>({ id: null, name: '', qty: 1 });
  const [autoSave, setAutoSave] = useState(true);
  const [lastSavedAt, setLastSavedAt] = useState<string>('');

  useEffect(() => {
    setItems(cartStore.load());
  }, []);

  const totalItems = useMemo(() => items.length, [items]);
  const totalQty = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.qty || 0), 0),
    [items]
  );

  useEffect(() => {
    if (!autoSave) return;
    cartStore.save(items);
    setLastSavedAt(new Date().toLocaleTimeString());
  }, [items, autoSave]);

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
    setLastSavedAt(new Date().toLocaleTimeString());
  };
  const load = () => setItems(cartStore.load());
  const clearStorage = () => cartStore.clear();
  const clearState = () => setItems([]);

  const startEdit = (id: number, currentName: string, currentQty: number) => {
    setEditing({ id, name: currentName, qty: currentQty });
  };
  const applyEdit = () => {
    if (editing.id == null) return;
    const n = editing.name.trim();
    const q = clampQty(Number(editing.qty));
    if (!n || q <= 0) return;
    setItems((prev) => prev.map((it) => (it.id === editing.id ? { ...it, name: n, qty: q } : it)));
    setEditing({ id: null, name: '', qty: 1 });
  };
  const cancelEdit = () => setEditing({ id: null, name: '', qty: 1 });

  const incQty = (id: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: clampQty(it.qty + 1) } : it)));
  };
  const decQty = (id: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: clampQty(it.qty - 1) } : it)));
  };
  const remove = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const [sortAsc, setSortAsc] = useState(true);
  const displayItems = useMemo(() => {
    return [...items].sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  }, [items, sortAsc]);

  return (
    <AppBasicLayout title="LocalStorage Cart: Pro">
      <Section title="Easy Snapshot">
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
        </Card>
      </Section>

      <Section title="Pro Features">
        <Card>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <input type="checkbox" checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />
              Auto-save
            </label>
            <Button onClick={() => setSortAsc((s) => !s)}>Sort by name: {sortAsc ? 'A→Z' : 'Z→A'}</Button>
          </div>

          <p style={{ marginTop: 8 }}>Items: <strong>{totalItems}</strong> • Total qty: <strong>{totalQty}</strong></p>
          {lastSavedAt && <p style={{ color: '#666' }}>Last saved: {lastSavedAt}</p>}

          <ul style={{ marginTop: 12 }}>
            {displayItems.map((it) => (
              <li key={it.id} style={{ marginBottom: 8 }}>
                <strong>{it.name}</strong> — qty: {it.qty}
                <div style={{ display: 'inline-flex', gap: 8, marginLeft: 12 }}>
                  <Button onClick={() => decQty(it.id)}>-1</Button>
                  <Button onClick={() => incQty(it.id)}>+1</Button>
                  <Button onClick={() => startEdit(it.id, it.name, it.qty)}>Edit</Button>
                  <Button onClick={() => remove(it.id)}>Delete</Button>
                </div>

                {editing.id === it.id && (
                  <div style={{ display: 'inline-flex', gap: 8, marginLeft: 12 }}>
                    <input
                      placeholder="Name"
                      aria-label="Edit name"
                      value={editing.name}
                      onChange={(e) => setEditing((s) => ({ ...s, name: e.target.value }))}
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      aria-label="Edit qty"
                      value={editing.qty}
                      onChange={(e) => setEditing((s) => ({ ...s, qty: Number(e.target.value) }))}
                    />
                    <Button onClick={applyEdit}>Apply</Button>
                    <Button onClick={cancelEdit}>Cancel</Button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {!autoSave && (
            <div style={{ marginTop: 8 }}>
              <Button onClick={save}>Save now</Button>
            </div>
          )}
        </Card>
        <p style={{ marginTop: 12, fontSize: 13 }}>
          Enhances the basic snapshot with auto-save, inline edit, quantity controls, sorting, and derived totals.
        </p>
        <p style={{ marginTop: 4, fontSize: 12, color: '#666' }}>
          Data persists under <code>"cart"</code> in localStorage via <code>src/services/cart.ts</code>.
        </p>
      </Section>

      <p style={{ marginTop: 16 }}>
        <a href="/basic">Back to Basics</a>
      </p>
    </AppBasicLayout>
  );
}