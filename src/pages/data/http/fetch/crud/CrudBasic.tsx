import { useState } from "react";

type Destination = {
  id: number;
  name: string;
  description: string;
};

const initialData: Destination[] = [
  { id: 1, name: "Moon", description: "Earth's natural satellite" },
  { id: 2, name: "Mars", description: "The red planet" },
];

const CrudBasic = () => {
  const [items, setItems] = useState<Destination[]>(initialData);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const onCreate = () => {
    if (!name.trim()) return;
    const nextId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([...items, { id: nextId, name: name.trim(), description: description.trim() }]);
    resetForm();
  };

  const onEdit = (item: Destination) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
  };

  const onUpdate = () => {
    if (editingId == null) return;
    setItems(items.map((i) => (i.id === editingId ? { ...i, name: name.trim(), description: description.trim() } : i)));
    resetForm();
  };

  const onDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>CRUD Basic (Client-only)</h2>
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {editingId ? (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={onUpdate}>Update</button>
            <button onClick={resetForm}>Cancel</button>
          </div>
        ) : (
          <button onClick={onCreate}>Create</button>
        )}
      </div>

      <ul style={{ marginTop: "1rem" }}>
        {items.map((i) => (
          <li key={i.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{i.name}</strong> — {i.description}
            <div style={{ display: "inline-flex", gap: "0.5rem", marginLeft: "1rem" }}>
              <button onClick={() => onEdit(i)}>Edit</button>
              <button onClick={() => onDelete(i.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudBasic;