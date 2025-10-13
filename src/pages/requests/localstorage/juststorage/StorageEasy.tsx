import { useEffect, useState } from "react";
import type { Destination } from "@/types/destination";
import * as local from "@/services/localStorage";

const StorageEasy = () => {
  const [items, setItems] = useState<Destination[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setItems(local.load());
  }, []);

  const create = () => {
    const n = name.trim();
    const d = description.trim();
    if (!n || !d) return;
    const next = local.add({ name: n, description: d } as any);
    setItems(next);
    setName("");
    setDescription("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>LocalStorage: StorageEasy</h2>
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input
          placeholder="Name"
          aria-label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Description"
          aria-label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={create}>Create</button>
      </div>
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