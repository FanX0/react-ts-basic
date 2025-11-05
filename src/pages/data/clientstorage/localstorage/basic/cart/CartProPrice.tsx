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
  price: number;
};

function clampQty(n: number): number {
  return Math.max(1, Math.floor(Number.isFinite(n) ? n : 1));
}

function clampPrice(n: number): number {
  const v = Number.isFinite(n) ? Number(n) : 0;
  return Math.max(0, v);
}

type CartItemEx = cartStore.CartItem & { price?: number };

export default function CartProPrice() {
  const [items, setItems] = useState<CartItemEx[]>([]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [editing, setEditing] = useState<EditState>({ id: null, name: '', qty: 1, price: 0 });
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
  const totalPrice = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.qty || 0) * Number(it.price || 0), 0),
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
    const p = clampPrice(Number(price));
    if (!n || q <= 0) return;
    const nextId = (items.reduce((m, it) => Math.max(m, Number(it.id)), 0) || 0) + 1;
    const next = [...items, { id: nextId, name: n, qty: q, price: p }];
    setItems(next);
    setName('');
    setQty(1);
    setPrice(0);
  };

  const save = () => {
    cartStore.save(items);
    setLastSavedAt(new Date().toLocaleTimeString());
  };
  const load = () => setItems(cartStore.load());
  const clearStorage = () => cartStore.clear();
  const clearState = () => setItems([]);

  const startEdit = (id: number, currentName: string, currentQty: number, currentPrice: number) => {
    setEditing({ id, name: currentName, qty: currentQty, price: currentPrice });
  };
  const applyEdit = () => {
    if (editing.id == null) return;
    const n = editing.name.trim();
    const q = clampQty(Number(editing.qty));
    const p = clampPrice(Number(editing.price));
    if (!n || q <= 0) return;
    setItems((prev) => prev.map((it) => (it.id === editing.id ? { ...it, name: n, qty: q, price: p } : it)));
    setEditing({ id: null, name: '', qty: 1, price: 0 });
  };
  const cancelEdit = () => setEditing({ id: null, name: '', qty: 1, price: 0 });

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

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <AppBasicLayout title="LocalStorage Cart: Pro (with Price)">
      <Section title="Easy Snapshot">
        <Card>
          <div style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
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
            <input
              type="number"
              placeholder="Price"
              aria-label="Price"
              min={0}
              step={0.01}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <Button onClick={add}>Add item</Button>
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button onClick={save}>Save snapshot</Button>
            <Button onClick={load}>Load snapshot</Button>
            <Button onClick={clearStorage}>Clear localStorage</Button>
            <Button onClick={clearState}>Clear state</Button>
          </div>

          <p style={{ marginTop: 12 }}>
            Total quantity: <strong>{totalQty}</strong> • Total price: <strong>{fmt(totalPrice)}</strong>
          </p>

          <ul style={{ marginTop: 8 }}>
            {items.map((it) => {
              const lineTotal = Number(it.qty || 0) * Number(it.price || 0);
              return (
                <li key={it.id}>
                  {it.name} — qty: {it.qty} • price: {fmt(Number(it.price || 0))} • total: {fmt(lineTotal)}
                </li>
              );
            })}
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

          <p style={{ marginTop: 8 }}>
            Items: <strong>{totalItems}</strong> • Total qty: <strong>{totalQty}</strong> • Total price: <strong>{fmt(totalPrice)}</strong>
          </p>
          {lastSavedAt && <p style={{ color: '#666' }}>Last saved: {lastSavedAt}</p>}

          <ul style={{ marginTop: 12 }}>
            {displayItems.map((it) => {
              const lineTotal = Number(it.qty || 0) * Number(it.price || 0);
              return (
                <li key={it.id} style={{ marginBottom: 8 }}>
                  <strong>{it.name}</strong> — qty: {it.qty} • price: {fmt(Number(it.price || 0))} • total: {fmt(lineTotal)}
                  <div style={{ display: 'inline-flex', gap: 8, marginLeft: 12 }}>
                    <Button onClick={() => decQty(it.id)}>-1</Button>
                    <Button onClick={() => incQty(it.id)}>+1</Button>
                    <Button onClick={() => startEdit(it.id, it.name, it.qty, Number(it.price || 0))}>Edit</Button>
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
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="Price"
                        aria-label="Edit price"
                        value={editing.price}
                        onChange={(e) => setEditing((s) => ({ ...s, price: Number(e.target.value) }))}
                      />
                      <Button onClick={applyEdit}>Apply</Button>
                      <Button onClick={cancelEdit}>Cancel</Button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {!autoSave && (
            <div style={{ marginTop: 8 }}>
              <Button onClick={save}>Save now</Button>
            </div>
          )}
        </Card>
        <p style={{ marginTop: 12, fontSize: 13 }}>
          Builds on Pro by adding price and totals alongside auto-save, edit, quantity controls, and sorting.
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