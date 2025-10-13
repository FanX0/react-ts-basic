import { useEffect, useState } from "react";
import type { Destination } from "@/types/destination";
import * as local from "@/services/localStorage";

const StorageTyped = () => {
  const [items, setItems] = useState<Destination[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  useEffect(() => {
    setItems(local.load());
  }, []);

  const validate = () => {
    const nextErrors: { name?: string; description?: string } = {};
    if (!name.trim()) nextErrors.name = "Name is required";
    if (!description.trim()) nextErrors.description = "Description is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const create = () => {
    if (!validate()) return;
    const next = local.add({ name: name.trim(), description: description.trim() } as any);
    setItems(next);
    setName("");
    setDescription("");
    setErrors({});
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>LocalStorage: StorageTyped</h2>
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input
          placeholder="Name"
          aria-label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p style={{ color: "red" }}>{errors.name}</p>
        )}
        <input
          placeholder="Description"
          aria-label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
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

export default StorageTyped;