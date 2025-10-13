import { useEffect, useState } from "react";
import type { Destination } from "@/types/destination";
import * as session from "@/services/sessionStorage";

const StorageTyped = () => {
  const [items, setItems] = useState<Destination[]>([]);
  // Read-only typed view — no create/edit/delete actions

  useEffect(() => {
    setItems(session.load());
  }, []);

  

  return (
    <div style={{ padding: "1rem" }}>
      <h2>SessionStorage: StorageTyped</h2>
      <p style={{ color: "#555" }}>Read-only typed view: loaded from sessionStorage.</p>
      <ul style={{ marginTop: "1rem" }}>
        {items.map((it) => (
          <li key={String((it as any).id ?? it.name)} role="listitem">
            <strong>{it.name}</strong> — {it.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorageTyped;