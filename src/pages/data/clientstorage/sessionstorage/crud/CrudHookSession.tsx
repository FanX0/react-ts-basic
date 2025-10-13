import { useState } from "react";
import { useDestinationsSessionStorage } from "@/hooks/useDestinationsSessionStorage";

const CrudHookSession = () => {
  const { items, create, update, remove } = useDestinationsSessionStorage();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const onCreate = () => {
    if (!name || !description) return;
    create({ name, description });
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
    update(editingId, { name, description });
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
    remove(id);
    if (editingId === id) onCancel();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>SessionStorage: CRUD Hook</h2>
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

export default CrudHookSession;