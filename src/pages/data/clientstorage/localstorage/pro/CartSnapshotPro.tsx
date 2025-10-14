import { useEffect, useMemo, useState } from "react";
import * as cartStore from "@/services/cart";

const currency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

const CartSnapshotPro = () => {
  const [items, setItems] = useState<cartStore.CartItem[]>([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setItems(cartStore.load());
  }, []);

  const totalQty = useMemo(() => items.reduce((sum, it) => sum + Number(it.qty || 0), 0), [items]);
  const totalPrice = useMemo(() => cartStore.total(items), [items]);

  const add = () => {
    const n = name.trim();
    const q = Number(qty);
    const p = Number(price);
    if (!n || q <= 0 || p < 0) return;
    const nextId = (items.reduce((m, it) => Math.max(m, Number(it.id)), 0) || 0) + 1;
    const next = [...items, { id: nextId, name: n, qty: q, price: p }];
    setItems(next);
    setName("");
    setQty(1);
    setPrice(0);
  };

  const updateItem = (id: number, patch: Partial<cartStore.CartItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const save = () => {
    cartStore.save(items);
  };

  const load = () => {
    setItems(cartStore.load());
  };

  const clearStorage = () => {
    cartStore.clear();
  };

  const clearState = () => {
    setItems([]);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>LocalStorage: Cart Snapshot Pro</h2>
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 520 }}>
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
          step="0.01"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button onClick={add}>Add item</button>
      </div>

      <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button onClick={save}>Save snapshot</button>
        <button onClick={load}>Load snapshot</button>
        <button onClick={clearStorage}>Clear localStorage</button>
        <button onClick={clearState}>Clear state</button>
      </div>

      <p style={{ marginTop: "0.75rem" }}>Total quantity: <strong>{totalQty}</strong></p>
      <p>Total price: <strong>{currency(totalPrice)}</strong></p>

      <table style={{ marginTop: "0.5rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", paddingRight: 8 }}>Name</th>
            <th style={{ textAlign: "right", paddingRight: 8 }}>Qty</th>
            <th style={{ textAlign: "right", paddingRight: 8 }}>Price</th>
            <th style={{ textAlign: "right", paddingRight: 8 }}>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.name}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={it.qty}
                  onChange={(e) => updateItem(it.id, { qty: Number(e.target.value) })}
                  style={{ width: 72, textAlign: "right" }}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={it.price ?? 0}
                  onChange={(e) => updateItem(it.id, { price: Number(e.target.value) })}
                  style={{ width: 96, textAlign: "right" }}
                />
              </td>
              <td style={{ textAlign: "right" }}>{currency(Number(it.qty || 0) * Number(it.price || 0))}</td>
              <td>
                <button onClick={() => removeItem(it.id)} aria-label={`Delete ${it.name}`}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
        Cart snapshot persists under <code>"cart"</code> in localStorage. Price is stored per item.
      </p>
    </div>
  );
};

export default CartSnapshotPro;