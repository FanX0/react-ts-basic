import { useEffect, useState } from "react";
import * as session from "@/services/sessionStorage";
import type { Destination } from "@/types/destination";

const StorageEasy = () => {
  const [items, setItems] = useState<Destination[]>([]);

  useEffect(() => {
    setItems(session.load());
  }, []);

  // Read-only "just fetch" view — no create/edit/delete actions

  return (
    <div style={{ padding: "1rem" }}>
      <h2>SessionStorage: StorageEasy</h2>
      <p style={{ color: "#555" }}>Read-only view: loaded from sessionStorage.</p>
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

export default StorageEasy;