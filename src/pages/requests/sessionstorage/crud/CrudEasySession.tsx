import { useEffect, useState } from "react";
import type { Destination } from "@/types/destination";
import * as session from "@/services/sessionStorage";

const CrudEasySession = () => {
  const [items, setItems] = useState<Destination[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    setItems(session.load());
  }, []);

  const onCreate = () => {
    if (!name || !description) return;
    const next = session.add({ name, description } as Omit<Destination, "id">);
    setItems(next);
    setName("");
    setDescription("");
  };

  const onEdit = (id: number) => {
    const it = items.find((x) => Number((x as any).id) === id);
    if (!it) return;
    setEditingId(id);
    setName(it.name);
    setDescription(it.description);
  };

  const onUpdate = () => {
    if (editingId == null) return;
    const next = session.update(editingId, { name, description });
    setItems(next);
    setEditingId(null);
    setName("");
    setDescription("");
  };

  const onCancel = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  const onDelete = (id: number) => {
    const next = session.remove(id);
    setItems(next);
    if (editingId === id) onCancel();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>SessionStorage: CRUD Easy</h2>
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {editingId == null ? (
          <button onClick={onCreate}>Create</button>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={onUpdate}>Update</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        )}
      </div>
      <ul style={{ marginTop: "1rem" }}>
        {items.map((it) => (
          <li key={String((it as any).id ?? it.name)} role="listitem">
            <strong>{it.name}</strong> — {it.description}
            <div style={{ display: "inline-flex", gap: "0.5rem", marginLeft: "0.5rem" }}>
              <button onClick={() => onEdit(Number((it as any).id))}>Edit</button>
              <button onClick={() => onDelete(Number((it as any).id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudEasySession;