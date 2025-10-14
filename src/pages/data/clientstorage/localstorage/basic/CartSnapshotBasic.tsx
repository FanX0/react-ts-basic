import { useEffect, useMemo, useState } from "react";
import * as cartStore from "@/services/cart";

const CartSnapshotBasic = () => {
  const [items, setItems] = useState<cartStore.CartItem[]>([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    // Load existing snapshot
    setItems(cartStore.load());
  }, []);

  const totalQty = useMemo(() => items.reduce((sum, it) => sum + Number(it.qty || 0), 0), [items]);

  const add = () => {
    const n = name.trim();
    const q = Number(qty);
    if (!n || q <= 0) return;
    const nextId = (items.reduce((m, it) => Math.max(m, Number(it.id)), 0) || 0) + 1;
    const next = [...items, { id: nextId, name: n, qty: q }];
    setItems(next);
    setName("");
    setQty(1);
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
      <h2>LocalStorage: Cart Snapshot Basic</h2>
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
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
        <button onClick={add}>Add item</button>
      </div>

      <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button onClick={save}>Save snapshot</button>
        <button onClick={load}>Load snapshot</button>
        <button onClick={clearStorage}>Clear localStorage</button>
        <button onClick={clearState}>Clear state</button>
      </div>

      <p style={{ marginTop: "0.75rem" }}>Total quantity: <strong>{totalQty}</strong></p>

      <ul style={{ marginTop: "0.5rem" }}>
        {items.map((it) => (
          <li key={it.id}>
            {it.name} — qty: {it.qty}
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
        Cart snapshot persists under <code>"cart"</code> in localStorage.
      </p>
    </div>
  );
};

export default CartSnapshotBasic;